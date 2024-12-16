import { CMSType } from './cms/cms-factory';

export interface SiteConfig {
	cmsType: CMSType;
}

const defaultConfig: SiteConfig = {
	cmsType: 'wordpress'
};

export function getStaticSiteConfig(): SiteConfig {
	return {
		cmsType: (process.env.CMS_TYPE as CMSType) || defaultConfig.cmsType
	};
}

// Only use this in app directory or API routes
export async function getDynamicSiteConfig(): Promise<SiteConfig> {
	if (typeof window !== 'undefined') {
		return getStaticSiteConfig();
	}
	
	// Dynamic imports to avoid loading headers in client context
	const { headers } = await import('next/headers');
	const headersList = headers();
	const cmsType = headersList.get('x-cms-type') as CMSType || defaultConfig.cmsType;
	
	return {
		cmsType
	};
} 