import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/constants";
import { getAllPostsWithSlug } from "../pages/api/wp-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Fetch all blog posts
	const posts = await getAllPostsWithSlug();
	const blogPosts = posts?.edges?.map(({ node }: { node: { slug: string; date: string } }) => ({
		url: `${SITE_URL}/blog/posts/${node.slug}`,
		lastModified: new Date(node.date),
		changeFrequency: "monthly",
		priority: 0.7,
	})) || [];

	// Base routes
	const routes = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
	];

	return [...routes, ...blogPosts];
}
