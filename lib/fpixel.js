export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
	if (typeof window !== "undefined" && window.fbq) {
		window.fbq("init", FB_PIXEL_ID);
		window.fbq("track", "PageView");
	}
};

export const event = (name, options = {}) => {
	if (typeof window !== "undefined" && window.fbq) {
		window.fbq("track", name, options);
	}
};
