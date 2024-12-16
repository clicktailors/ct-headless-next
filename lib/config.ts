import { CMSType } from './cms/cms-factory';
import { headers } from 'next/headers';

export function getSiteConfig() {
	const headersList = headers();
	
	return {
		type: (headersList.get('x-site-cms-type') || process.env.CMS_TYPE || 'wordpress') as CMSType,
		siteName: headersList.get('x-site-name') || process.env.SITE_NAME || 'My Site',
		siteDescription: process.env.SITE_DESCRIPTION || 'Welcome to my site',
		wordpress: {
			apiUrl: headersList.get('x-wordpress-api-url') || process.env.WORDPRESS_API_URL,
		},
		neon: {
			url: process.env.NEON_DATABASE_URL
		}
	};
}

export const cmsConfig = getSiteConfig(); 