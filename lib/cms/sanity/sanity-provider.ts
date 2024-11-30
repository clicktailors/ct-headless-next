import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { CMSProvider } from '../types';

export class SanityProvider implements CMSProvider {
	private client;
	private builder;

	constructor(
		private config: {
			projectId: string;
			dataset: string;
			apiVersion: string;
			useCdn?: boolean;
		}
	) {
		this.client = createClient({
			projectId: config.projectId,
			dataset: config.dataset,
			apiVersion: config.apiVersion,
			useCdn: config.useCdn ?? true,
		});
		this.builder = imageUrlBuilder(this.client);
	}

	private urlFor(source: any) {
		return this.builder.image(source);
	}

	async getPreviewPost(id: number): Promise<any> {
		const post = await this.client.fetch(
			`*[_type == "post" && _id == $id][0]`,
			{ id }
		);
		return post;
	}

	async getAllPostsWithSlug() {
		const posts = await this.client.fetch(`
			*[_type == "post"] {
				title,
				slug,
				date,
				_updatedAt,
				"featuredImage": mainImage {
					asset->
				},
				excerpt,
				author-> {
					name,
					"avatar": image.asset->url
				}
			}
		`);

		return {
			edges: posts.map((post: any) => ({
				node: {
					...post,
					modified: post._updatedAt,
					featuredImage: post.featuredImage ? {
						node: {
							sourceUrl: this.urlFor(post.featuredImage).url()
						}
					} : null,
					author: post.author ? {
						node: {
							...post.author,
							firstName: post.author.name.split(' ')[0],
							lastName: post.author.name.split(' ').slice(1).join(' '),
							avatar: {
								url: post.author.avatar
							}
						}
					} : null
				}
			}))
		};
	}

	async getAllPostsForHome(preview: boolean) {
		const posts = await this.client.fetch(`
			*[_type == "post"] | order(date desc) {
				title,
				slug,
				date,
				excerpt,
				"featuredImage": mainImage {
					asset->
				},
				author-> {
					name,
					"avatar": image.asset->url
				}
			}
		`);

		return {
			edges: posts.map((post: any) => ({
				node: {
					...post,
					featuredImage: post.featuredImage ? {
						node: {
							sourceUrl: this.urlFor(post.featuredImage).url()
						}
					} : null,
					author: post.author ? {
						node: {
							...post.author,
							firstName: post.author.name.split(' ')[0],
							lastName: post.author.name.split(' ').slice(1).join(' '),
							avatar: {
								url: post.author.avatar
							}
						}
					} : null
				}
			}))
		};
	}

	async getPostAndMorePosts(slug: string, preview: boolean) {
		const post = await this.client.fetch(`
			*[_type == "post" && slug.current == $slug][0] {
				title,
				slug,
				content,
				date,
				"featuredImage": mainImage {
					asset->
				},
				author-> {
					name,
					"avatar": image.asset->url
				},
				"categories": categories[]-> { title },
				"tags": tags[]-> { title }
			}
		`, { slug });

		const morePosts = await this.client.fetch(`
			*[_type == "post" && slug.current != $slug] | order(date desc)[0...3] {
				title,
				slug,
				excerpt,
				date,
				"featuredImage": mainImage {
					asset->
				},
				author-> {
					name,
					"avatar": image.asset->url
				}
			}
		`, { slug });

		return {
			post: {
				...post,
				slug: post.slug.current,
				featuredImage: post.featuredImage ? {
					node: {
						sourceUrl: this.urlFor(post.featuredImage).url()
					}
				} : null,
				author: post.author ? {
					node: {
						...post.author,
						firstName: post.author.name.split(' ')[0],
						lastName: post.author.name.split(' ').slice(1).join(' '),
						avatar: {
							url: post.author.avatar
						}
					}
				} : null,
				categories: {
					edges: post.categories?.map((cat: any) => ({
						node: { name: cat.title }
					})) || []
				},
				tags: {
					edges: post.tags?.map((tag: any) => ({
						node: { name: tag.title }
					})) || []
				}
			},
			posts: {
				edges: morePosts.map((post: any) => ({
					node: {
						...post,
						slug: post.slug.current,
						featuredImage: post.featuredImage ? {
							node: {
								sourceUrl: this.urlFor(post.featuredImage).url()
							}
						} : null,
						author: post.author ? {
							node: {
								...post.author,
								firstName: post.author.name.split(' ')[0],
								lastName: post.author.name.split(' ').slice(1).join(' '),
								avatar: {
									url: post.author.avatar
								}
							}
						} : null
					}
				}))
			}
		};
	}

	async getPageBySlug(slug: string) {
		const page = await this.client.fetch(`
			*[_type == "page" && slug.current == $slug][0] {
				title,
				content,
				"slug": slug.current,
				_updatedAt,
				"featuredImage": mainImage {
					asset->
				}
			}
		`, { slug });

		return {
			...page,
			modified: page._updatedAt,
			featuredImage: page.featuredImage ? {
				node: {
					sourceUrl: this.urlFor(page.featuredImage).url()
				}
			} : null
		};
	}

	async getAllPages() {
		const pages = await this.client.fetch(`
			*[_type == "page"] {
				title,
				"slug": slug.current,
				content
			}
		`);

		return {
			edges: pages.map((page: any) => ({
				node: page
			}))
		};
	}
} 