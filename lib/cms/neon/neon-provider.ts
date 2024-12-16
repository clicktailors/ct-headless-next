import { CMSProvider } from '../types';
import { neon, neonConfig } from '@neondatabase/serverless';

// Configure Neon to work in Edge runtime
neonConfig.fetchConnectionCache = true;

interface NeonPost {
	id: number;
	title: string;
	slug: string;
	date: Date;
	modified?: Date;
	featured_image?: string;
	content?: string;
	excerpt?: string;
	author_name?: string;
	author_avatar?: string;
}

export class NeonProvider implements CMSProvider {
	private sql;

	constructor(private neonUrl: string) {
		this.sql = neon(neonUrl);
	}

	async getPreviewPost(id: number, idType = "DATABASE_ID") {
		const [post] = await (this.sql`
			SELECT * FROM posts 
			WHERE ${idType === "DATABASE_ID" ? "id" : "slug"} = ${id}
			LIMIT 1
		`).then(rows => rows as unknown as NeonPost[]);
		return post;
	}

	async getAllPostsWithSlug() {
		const posts = await (this.sql`
			SELECT * FROM posts 
			ORDER BY date DESC
		`).then(rows => rows as unknown as NeonPost[]);

		return {
			edges: posts.map(post => ({
				node: {
					...post,
					featuredImage: post.featured_image ? {
						node: { sourceUrl: post.featured_image }
					} : null,
					author: post.author_name ? {
						node: {
							name: post.author_name,
							avatar: post.author_avatar ? {
								url: post.author_avatar
							} : undefined
						}
					} : null
				}
			}))
		};
	}

	async getAllPostsForHome(preview: boolean, page = 1, perPage = 20) {
		const offset = (page - 1) * perPage;

		const [posts, [{ count }]] = await Promise.all([
			(this.sql`
				SELECT * FROM posts 
				ORDER BY date DESC 
				LIMIT ${perPage} 
				OFFSET ${offset}
			`).then(rows => rows as unknown as NeonPost[]),
			(this.sql`
				SELECT COUNT(*) as count FROM posts
			`).then(rows => rows as unknown as [{ count: number }])
		]);

		return {
			edges: posts.map(post => ({
				node: {
					...post,
					featuredImage: post.featured_image ? {
						node: { sourceUrl: post.featured_image }
					} : null,
					author: post.author_name ? {
						node: {
							name: post.author_name,
							avatar: post.author_avatar ? {
								url: post.author_avatar
							} : undefined
						}
					} : null
				}
			})),
			pageInfo: {
				hasNextPage: offset + perPage < count,
				endCursor: posts.length > 0 ? posts[posts.length - 1].id.toString() : null
			}
		};
	}

	async getPostAndMorePosts(slug: string, preview: boolean) {
		const [[post], morePosts] = await Promise.all([
			(this.sql`
				SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
			`).then(rows => rows as unknown as NeonPost[]),
			(this.sql`
				SELECT * FROM posts 
				WHERE slug != ${slug} 
				ORDER BY date DESC 
				LIMIT 3
			`).then(rows => rows as unknown as NeonPost[])
		]);

		return {
			post: post ? {
				...post,
				featuredImage: post.featured_image ? {
					node: { sourceUrl: post.featured_image }
				} : null,
				author: post.author_name ? {
					node: {
						name: post.author_name,
						avatar: post.author_avatar ? {
							url: post.author_avatar
						} : undefined
					}
				} : null
			} : null,
			posts: {
				edges: morePosts.map(post => ({
					node: {
						...post,
						featuredImage: post.featured_image ? {
							node: { sourceUrl: post.featured_image }
						} : null,
						author: post.author_name ? {
							node: {
								name: post.author_name,
								avatar: post.author_avatar ? {
									url: post.author_avatar
								} : undefined
							}
						} : null
					}
				}))
			}
		};
	}

	async getAllPages() {
		const pages = await (this.sql`
			SELECT * FROM pages
		`).then(rows => rows as unknown as NeonPost[]);

		return {
			edges: pages.map(page => ({
				node: {
					...page,
					featuredImage: page.featured_image ? {
						node: { sourceUrl: page.featured_image }
					} : null
				}
			}))
		};
	}

	async getPageBySlug(slug: string) {
		const [page] = await (this.sql`
			SELECT * FROM pages WHERE slug = ${slug} LIMIT 1
		`).then(rows => rows as unknown as NeonPost[]);

		if (!page) return null;

		return {
			...page,
			featuredImage: page.featured_image ? {
				node: { sourceUrl: page.featured_image }
			} : null
		};
	}
} 