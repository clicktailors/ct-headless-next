import { MongoClient } from 'mongodb';
import { createCMSProvider } from '../lib/cms/cms-factory';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { LOGGING } from '../lib/logging';
// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface WPNode {
	title: string;
	slug: string;
	date: string;
	modified?: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
		};
	};
	content?: string;
	excerpt?: string;
	author?: {
		node: {
			name: string;
			firstName?: string;
			lastName?: string;
			avatar?: {
				url: string;
			};
		};
	};
}

async function migrateContent() {
	// Get WordPress content
	const wpProvider = createCMSProvider('wordpress');
	const posts = await wpProvider.getAllPostsWithSlug();
	const pages = await wpProvider.getAllPages();

	// Connect to MongoDB
	const mongoUri = process.env.MONGODB_URI;
	const dbName = process.env.MONGODB_DB_NAME;
	
	if (!mongoUri || !dbName) {
		throw new Error('MongoDB configuration is not complete');
	}

	const client = new MongoClient(mongoUri);
	await client.connect();
	const db = client.db(dbName);

	// Migrate posts
	const postsCollection = db.collection('posts');
	await postsCollection.deleteMany({});
	await postsCollection.insertMany(
		posts.edges.map(({ node }: { node: WPNode }) => ({
			...node,
			featuredImage: node.featuredImage?.node.sourceUrl || null,
			date: new Date(node.date),
			modified: node.modified ? new Date(node.modified) : null,
		}))
	);

	// Migrate pages
	const pagesCollection = db.collection('pages');
	await pagesCollection.deleteMany({});
	await pagesCollection.insertMany(
		pages.edges.map(({ node }: { node: WPNode }) => ({
			...node,
			featuredImage: node.featuredImage?.node.sourceUrl || null,
			modified: node.modified ? new Date(node.modified) : null,
		}))
	);

	await client.close();
	LOGGING && console.log('Migration complete!');
}

migrateContent().catch(console.error); 