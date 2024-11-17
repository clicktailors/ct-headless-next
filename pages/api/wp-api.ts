import axios from 'axios';

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
	const headers: Record<string, string> = { 
		"Content-Type": "application/json",
		"Accept": "application/json"
	};

	const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	
	if (!API_URL) {
		throw new Error('API_URL is not defined');
	}

	const maxRetries = 3;
	let lastError;

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			const { data } = await axios.post(API_URL, {
				query,
				variables,
			}, { 
				headers,
				timeout: 15000 // Increased timeout
			});

			if (data.errors) {
				console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
				throw new Error(data.errors[0]?.message || "Failed to fetch API");
			}
			
			return data.data;
		} catch (error: any) {
			lastError = error;
			console.error(`API Error (attempt ${attempt + 1}/${maxRetries}):`, {
				message: error.message,
				status: error.response?.status,
				query: query.slice(0, 200) + '...',
				variables
			});

			if (error.response?.status === 403) {
				console.warn('Authentication error - check WORDPRESS_AUTH_REFRESH_TOKEN');
			}

			// Only retry on network errors or 5xx errors
			if (!error.response || error.response.status >= 500) {
				await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
				continue;
			}
			break;
		}
	}

	throw new Error(`Failed to fetch API after ${maxRetries} attempts: ${lastError.message}`);
}

export async function getPreviewPost(id: number, idType = "DATABASE_ID") {
	const data = await fetchAPI(
		`
		query PreviewPost($id: ID!, $idType: PostIdType!) {
			post(id: $id, idType: $idType) {
				databaseId
				slug
				status
			}
		}`,
		{
			variables: { id, idType },
		},
	);
	return data.post;
}

export async function getAllPostsWithSlug() {
	const data = await fetchAPI(`
		{
			posts(first: 10000) {
				edges {
					node {
						title
							excerpt
							slug
							date
							modified
							featuredImage {
								node {
									sourceUrl
								}
							}
							author {
								node {
									name
									firstName
									lastName
									avatar {
										url
									}
								}
							}
					}
				}
			}
		}
	`);
	return data?.posts;
}

export async function getAllPostsForHome(preview: boolean, page = 1, perPage = 20) {
	const variables = {
		first: perPage,
		after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
	};

	const data = await fetchAPI(
		`
		query AllPosts($first: Int!, $after: String) {
			posts(
				first: $first,
				after: $after,
				where: { orderby: { field: DATE, order: DESC } }
			) {
				pageInfo {
					hasNextPage
					endCursor
				}
				edges {
					node {
						title
						excerpt
						slug
						date
						featuredImage {
							node {
								sourceUrl
							}
						}
						author {
							node {
								name
								firstName
								lastName
								avatar {
									url
								}
							}
						}
					}
				}
			}
		}`,
		{ variables }
	);

	return data?.posts;
}

export async function getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
	const postPreview = preview && previewData?.post;
	// The slug may be the id of an unpublished post
	const isId = Number.isInteger(Number(slug));
	const isSamePost = isId
		? Number(slug) === postPreview?.id
		: slug === postPreview?.slug;
	const isDraft = isSamePost && postPreview?.status === "draft";
	const isRevision = isSamePost && postPreview?.status === "publish";
	
	// Add these variables to the query
	const variables = {
		id: isDraft ? postPreview.id : slug,
		idType: isDraft ? 'DATABASE_ID' : 'SLUG'
	};

	const data = await fetchAPI(
		`
		fragment AuthorFields on User {
			name
			firstName
			lastName
			avatar {
				url
			}
		}
		fragment PostFields on Post {
			title
			excerpt
			slug
			date
			featuredImage {
				node {
					sourceUrl
				}
			}
			author {
				node {
					...AuthorFields
				}
			}
			categories {
				edges {
					node {
						name
					}
				}
			}
			tags {
				edges {
					node {
						name
					}
				}
			}
		}
		query PostBySlug($id: ID!, $idType: PostIdType!) {
			post(id: $id, idType: $idType) {
				...PostFields
				content
				${
					isRevision
						? `
				revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
					edges {
						node {
							title
							excerpt
							content
							author {
								node {
									...AuthorFields
								}
							}
						}
					}
				}
				`
						: ""
				}
			}
			posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
				edges {
					node {
						...PostFields
					}
				}
			}
		}
	`,
		{
			variables // Pass the variables here
		}
	);

	// Rest of the function remains the same
	if (isDraft) data.post.slug = postPreview.id;
	if (isRevision && data.post.revisions) {
		const revision = data.post.revisions.edges[0]?.node;
		if (revision) Object.assign(data.post, revision);
		delete data.post.revisions;
	}

	data.posts.edges = data.posts.edges.filter(({ node }: { node: { slug: string } }) => node.slug !== slug);
	if (data.posts.edges.length > 2) data.posts.edges.pop();

	return data;
}
