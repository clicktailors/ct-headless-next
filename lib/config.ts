import { CMSType } from './cms/cms-factory';

export const cmsConfig = {
	type: (process.env.CMS_TYPE || 'wordpress') as CMSType,
	siteName: process.env.SITE_NAME || 'My Site',
	siteDescription: process.env.SITE_DESCRIPTION || 'Welcome to my site',
	wordpress: {
		apiUrl: process.env.WORDPRESS_API_URL,
	},
	mongodb: {
		uri: process.env.MONGODB_URI,
		dbName: process.env.MONGODB_DB_NAME,
	}
}; 