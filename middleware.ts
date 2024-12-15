import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon, neonConfig } from '@neondatabase/serverless';

// Configure Neon to work in Edge runtime
neonConfig.fetchConnectionCache = true;

interface SiteConfig {
	site_id: string;
	site_name: string;
	cms_type: string;
	wordpress_api_url?: string;
	mongodb_uri?: string;
	mongodb_db_name?: string;
}

const sql = neon(process.env.NEON_DATABASE_URL || '');

export async function middleware(request: NextRequest) {
	try {
		const hostname = request.headers.get('host') || '';
		const domain = hostname.replace(/^www\./, '');

		// Query site config from Neon
		const siteConfigs = await sql`
			SELECT 
				site_id,
				site_name,
				cms_type,
				wordpress_api_url,
				mongodb_uri,
				mongodb_db_name
			FROM site_configs 
			WHERE domain = ${domain}
			LIMIT 1
		` as SiteConfig[];

		const requestHeaders = new Headers(request.headers);
		
		if (siteConfigs?.[0]) {
			const config = siteConfigs[0];
			requestHeaders.set('x-site-id', config.site_id);
			requestHeaders.set('x-site-name', config.site_name);
			requestHeaders.set('x-site-cms-type', config.cms_type);
			
			if (config.wordpress_api_url) {
				requestHeaders.set('x-wordpress-api-url', config.wordpress_api_url);
			}
		} else {
			// Fallback to environment variables
			requestHeaders.set('x-site-id', process.env.SITE_ID || 'clicktailors');
			requestHeaders.set('x-site-name', process.env.SITE_NAME || 'ClickTailors');
			requestHeaders.set('x-site-cms-type', process.env.CMS_TYPE || 'wordpress');
		}

		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	} catch (error) {
		console.error('Middleware error:', error);
		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}; 