export interface ThirdPartyScript {
	id: string;
	src?: string;
	strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
	innerHTML?: string;
	async?: boolean;
	defer?: boolean;
	nonce?: string;
}

export const thirdPartyScripts: ThirdPartyScript[] = [
	{
		id: "facebook-pixel",
		strategy: "beforeInteractive",
		innerHTML: `
			!function(f,b,e,v,n,t,s)
			{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};
			if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
			n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t,s)}(window, document,'script',
			'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
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
