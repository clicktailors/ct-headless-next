import type { NextApiRequest, NextApiResponse } from "next";
import { createCMSProvider } from "../../lib/cms/cms-factory";
import { getStaticSiteConfig } from "../../lib/config";

export default async function preview(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { secret, id, slug } = req.query;

	// Check the secret and next parameters
	// This secret should only be known by this API route
	if (
		!process.env.WORDPRESS_PREVIEW_SECRET ||
		secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
		(!id && !slug)
	) {
		return res.status(401).json({ message: "Invalid token" });
	}

	// Fetch WordPress data
	const config = getStaticSiteConfig();
	const cms = createCMSProvider(config.cmsType);
	
	try {
		// @ts-ignore
		const post = await cms.getPreviewPost(id || slug, id ? "DATABASE_ID" : "SLUG");

		if (!post) {
			return res.status(401).json({ message: "Post not found" });
		}

		// Enable Preview Mode by setting the cookies
		res.setPreviewData({
			post: {
				id: post.id,
				slug: post.slug,
				status: post.status,
			},
		});

		// Redirect to the path from the fetched post
		// We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
		res.writeHead(307, { Location: `/blog/posts/${post.slug || slug}` });
		res.end();
	} catch (error) {
		console.error("Preview Error:", error);
		return res.status(500).json({ message: "Error reading preview post" });
	}
} 