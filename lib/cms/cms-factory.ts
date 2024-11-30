import { CMSProvider } from './types';
import { WordPressProvider } from './wordpress/wp-provider';
import { MongoDBProvider } from './mongodb/mongo-provider';
import { SanityProvider } from './sanity/sanity-provider';

export type CMSType = 'wordpress' | 'mongodb' | 'sanity';

export function createCMSProvider(type: CMSType): CMSProvider {
	switch (type) {
		case 'wordpress':
			const wpApiUrl = process.env.WORDPRESS_API_URL;
			
			if (!wpApiUrl) {
				throw new Error('WORDPRESS_API_URL is not defined');
			}
			
			return new WordPressProvider(wpApiUrl);
			
		case 'mongodb':
			const mongoUri = process.env.MONGODB_URI;
			const dbName = process.env.MONGODB_DB_NAME;
			
			if (!mongoUri || !dbName) {
				throw new Error('MongoDB configuration is not complete');
			}
			
			return new MongoDBProvider(mongoUri, dbName);
			
		case 'sanity':
			const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
			const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
			const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
			
			if (!projectId || !dataset) {
				throw new Error('Sanity configuration is not complete');
			}
			
			return new SanityProvider({
				projectId,
				dataset,
				apiVersion,
				useCdn: process.env.NODE_ENV === 'production'
			});
			
		default:
			throw new Error(`Unsupported CMS type: ${type}`);
	}
} 