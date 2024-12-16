import { MetadataRoute } from "next";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { getDynamicSiteConfig } from "../lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const config = await getDynamicSiteConfig();
	const cms = createCMSProvider(config.cmsType);
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

	// Get all posts
	const posts = await cms.getAllPostsWithSlug();
	const postUrls = posts.edges.map(({ node }: { node: { slug: string; date: string } }) => ({
		url: `${baseUrl}/blog/posts/${node.slug}`,
		lastModified: new Date(node.date),
		changeFrequency: "monthly",
		priority: 0.7,
	}));

	// Base routes with standard priorities
	const routes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/terms-of-service`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.3,
		},
	];

	// Get all pages
	const pages = await cms.getAllPages();
	const pageUrls = pages.edges.map(({ node }: any) => ({
		url: `${baseUrl}/${node.slug}`,
		lastModified: new Date(node.modified || new Date()),
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	return [...routes, ...postUrls, ...pageUrls];
}
