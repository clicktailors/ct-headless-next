import { CMSProvider } from '../types';
import { MongoClient, ObjectId } from 'mongodb';

interface MongoPost {
	_id: ObjectId;
	title: string;
	slug: string;
	date: Date;
	modified?: Date;
	featuredImage?: string;
	content?: string;
	excerpt?: string;
	author?: {
		node: {
			name: string;
			firstName?: string;
			lastName?: string;
			avatar?: {
				url: string;
			};
		};
	};
}

interface MongoPage {
	_id: ObjectId;
	title: string;
	slug: string;
	content: string;
	modified?: Date;
	featuredImage?: string;
}

export class MongoDBProvider implements CMSProvider {
	private client: MongoClient;
	private dbName: string;

	constructor(private uri: string, dbName: string) {
		this.client = new MongoClient(uri);
		this.dbName = dbName;
	}

	private async connect() {
		if (!this.client.connect) {
			await this.client.connect();
		}
		return this.client.db(this.dbName);
	}

	async getPreviewPost(id: number, idType = "DATABASE_ID") {
		const db = await this.connect();
		const post = await db.collection<MongoPost>('posts').findOne({ 
			[idType === "DATABASE_ID" ? "_id" : "slug"]: id 
		});
		return post;
	}

	async getAllPostsWithSlug() {
		const db = await this.connect();
		const posts = await db.collection<MongoPost>('posts')
			.find({})
			.sort({ date: -1 })
			.toArray();

		return {
			edges: posts.map((post: MongoPost) => ({
				node: {
					...post,
					featuredImage: post.featuredImage ? {
						node: { sourceUrl: post.featuredImage }
					} : null
				}
			}))
		};
	}

	async getAllPostsForHome(preview: boolean, page = 1, perPage = 20) {
		const db = await this.connect();
		const skip = (page - 1) * perPage;

		const [posts, totalCount] = await Promise.all([
			db.collection<MongoPost>('posts')
				.find({})
				.sort({ date: -1 })
				.skip(skip)
				.limit(perPage)
				.toArray(),
			db.collection('posts').countDocuments()
			]);

		return {
			edges: posts.map((post: MongoPost) => ({
				node: {
					...post,
					featuredImage: post.featuredImage ? {
						node: { sourceUrl: post.featuredImage }
					} : null
				}
			})),
			pageInfo: {
				hasNextPage: skip + perPage < totalCount,
				endCursor: posts.length > 0 ? posts[posts.length - 1]._id.toString() : null
			}
		};
	}

	async getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
		const db = await this.connect();
		const post = await db.collection<MongoPost>('posts').findOne({ slug });

		const morePosts = await db.collection<MongoPost>('posts')
			.find({ slug: { $ne: slug } })
			.sort({ date: -1 })
			.limit(3)
			.toArray();

		return {
			post: {
				...post,
				featuredImage: post?.featuredImage ? {
					node: { sourceUrl: post.featuredImage }
				} : null
			},
			posts: {
				edges: morePosts.map((post: MongoPost) => ({
					node: {
						...post,
						featuredImage: post.featuredImage ? {
							node: { sourceUrl: post.featuredImage }
						} : null
					}
				}))
			}
		};
	}

	async getAllPages() {
		const db = await this.connect();
		const pages = await db.collection<MongoPage>('pages')
			.find({})
			.toArray();

		return {
			edges: pages.map((page: MongoPage) => ({
				node: page
			}))
		};
	}

	async getPageBySlug(slug: string): Promise<any> {
		const db = await this.connect();
		const page = await db.collection<MongoPage>('pages').findOne({ slug });
		
		if (!page) {
			return null;
		}

		return {
			...page,
			featuredImage: page.featuredImage ? {
				node: { sourceUrl: page.featuredImage }
			} : null
		};
	}
} 