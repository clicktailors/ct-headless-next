import type { NextApiRequest, NextApiResponse } from "next";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";

export default async function preview(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { secret, id, slug } = req.query as { secret?: string; id?: string; slug?: string };

	// Check the secret and next parameters
	// This secret should only be known by this API route
	if (
		!process.env.WORDPRESS_PREVIEW_SECRET ||
		secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
		(!id && !slug)
	) {
		return res.status(401).json({ message: "Invalid token" });
	}
	// Fetch WordPress to check if the provided `id` or `slug` exists
	const cms = createCMSProvider(cmsConfig.type);
	const post = await cms.getPreviewPost(
		id ? parseInt(id as string, 10) : (slug ? parseInt(slug as string, 10) : 0),
		id ? "DATABASE_ID" : "SLUG"
	);

	// If the post doesn't exist prevent preview mode from being enabled
	if (!post) {
		return res.status(401).json({ message: "Post not found" });
	}

	// Enable Preview Mode by setting the cookies
	res.setPreviewData({
		post: {
			id: post.databaseId,
			slug: post.slug,
			status: post.status,
		},
	});

	// Redirect to the path from the fetched post
	// We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
	res.writeHead(307, { Location: `/posts/${post.slug || post.databaseId}` });
	res.end();
}