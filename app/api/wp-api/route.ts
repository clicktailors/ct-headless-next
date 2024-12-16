import { headers } from 'next/headers';
import { createCMSProvider } from '../../../lib/cms/cms-factory';
import { getDynamicSiteConfig } from '../../../lib/config';

export async function GET(request: Request) {
	const config = await getDynamicSiteConfig();
	const provider = createCMSProvider(config.cmsType);

	const { searchParams } = new URL(request.url);
	const path = searchParams.get('path');

	if (!path) {
		return new Response('Path is required', { status: 400 });
	}

	try {
		const response = await fetch(`${process.env.WORDPRESS_API_URL}${path}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('WordPress API Error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}