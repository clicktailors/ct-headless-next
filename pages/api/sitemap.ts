import { createCMSProvider } from '../../lib/cms/cms-factory';
import { getStaticSiteConfig } from '../../lib/config';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const config = getStaticSiteConfig();
		const cms = createCMSProvider(config.cmsType);
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

		// Get all posts
		const posts = await cms.getAllPostsWithSlug();
		const postUrls = posts.edges.map(({ node }: any) => ({
			url: `${baseUrl}/blog/posts/${node.slug}`,
			lastmod: new Date(node.modified || node.date).toISOString(),
			changefreq: "monthly",
			priority: 0.7,
		}));

		// Base routes with standard priorities
		const routes = [
			{
				url: baseUrl,
				lastmod: new Date().toISOString(),
				changefreq: "yearly",
				priority: 1,
			},
			{
				url: `${baseUrl}/contact`,
				lastmod: new Date().toISOString(),
				changefreq: "monthly",
				priority: 0.8,
			},
			{
				url: `${baseUrl}/blog`,
				lastmod: new Date().toISOString(),
				changefreq: "weekly",
				priority: 0.5,
			},
			{
				url: `${baseUrl}/privacy-policy`,
				lastmod: new Date().toISOString(),
				changefreq: "monthly",
				priority: 0.3,
			},
			{
				url: `${baseUrl}/terms-of-service`,
				lastmod: new Date().toISOString(),
				changefreq: "monthly",
				priority: 0.3,
			},
		];

		// Get all pages
		const pages = await cms.getAllPages();
		const pageUrls = pages.edges.map(({ node }: any) => ({
			url: `${baseUrl}/${node.slug}`,
			lastmod: new Date(node.modified || new Date()).toISOString(),
			changefreq: "monthly",
			priority: 0.6,
		}));

		// Generate XML
		const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${[...routes, ...postUrls, ...pageUrls]
				.map(
					(route) => `
				<url>
					<loc>${route.url}</loc>
					<lastmod>${route.lastmod}</lastmod>
					<changefreq>${route.changefreq}</changefreq>
					<priority>${route.priority}</priority>
				</url>
			`
				)
				.join("")}
		</urlset>`;

		// Set headers
		res.setHeader("Content-Type", "application/xml");
		res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=600");

		// Send response
		return res.status(200).send(xml);
	} catch (error) {
		console.error('Error generating sitemap:', error);
		res.status(500).json({ error: 'Error generating sitemap' });
	}
}