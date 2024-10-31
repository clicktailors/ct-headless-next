// "use client";

import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "../../lib/fpixel";

export const usePixelTracking = () => {
	const router = useRouter();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (!isInitialized) return;

		// Initial pageview
		pixel.pageview();

		const handleRouteChange = () => {
			pixel.pageview();
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events, isInitialized]);

	return setIsInitialized;
};

const FacebookPixel = () => {
	const setIsInitialized = usePixelTracking();

	return (
		<Script
			id="fb-pixel"
			src="/scripts/pixel.js"
			strategy="afterInteractive"
			data-pixel-id={pixel.FB_PIXEL_ID}
			onLoad={() => setIsInitialized(true)}
		/>
	);
};

export default FacebookPixel;
