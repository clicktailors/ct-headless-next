export interface ThirdPartyScript {
	id: string;
	src?: string;
	strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
	innerHTML?: string;
	async?: boolean;
	defer?: boolean;
	nonce?: string;
}

export interface ThirdPartyMetaTag {
	id: string;
	content: string;
}

export const thirdPartyScripts: ThirdPartyScript[] = [
	{
		id: "facebook-pixel",
		strategy: "beforeInteractive",
		src: "https://connect.facebook.net/en_US/fbevents.js",
		innerHTML: `
			window.fbq = window.fbq || function() {
				(window.fbq.q = window.fbq.q || []).push(arguments)
			};
			window._fbq = window._fbq || window.fbq;
			window.fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
			window.fbq('track', 'PageView');
		`,
	},
	{
		id: "google-analytics",
		strategy: "afterInteractive",
		innerHTML: `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
			`,
	},
	{
		id: "google-analytics-script",
		strategy: "afterInteractive",
		src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`,
	},
	{
		id: "pinterest-verification",
		strategy: "beforeInteractive",
		src: `https://s.pinimg.com/ct/core.js`,
		innerHTML: `<meta name="p:domain_verify" content="52ef2a40792e1120add9c27ecc08a51c"/>`,
	},
	{
		id: "pinterest-tag",
		strategy: "afterInteractive",
		src: `https://s.pinimg.com/ct/core.js`,
	},
];

export const thirdPartyMetaTags: ThirdPartyMetaTag[] = [
	{
		id: "pinterest-verification",
		content: `<meta name="p:domain_verify" content="52ef2a40792e1120add9c27ecc08a51c"/>`,
	},
];
