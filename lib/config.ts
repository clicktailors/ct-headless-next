export const cmsConfig = {
	type: (process.env.CMS_TYPE || 'wordpress') as 'wordpress' | 'mongodb' | 'sanity',
	siteName: process.env.SITE_NAME || 'My Site',
	siteDescription: process.env.SITE_DESCRIPTION || 'Welcome to my site',
	wordpress: {
		apiUrl: process.env.WORDPRESS_API_URL,
	},
	mongodb: {
		uri: process.env.MONGODB_URI,
		dbName: process.env.MONGODB_DB_NAME,
	},
	sanity: {
		projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
		apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
	}
}; 