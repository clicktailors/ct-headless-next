"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export default function FacebookPixel() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const initialized = useRef(false);

	useEffect(() => {
		if (!FB_PIXEL_ID) return;

		try {
			if (!initialized.current) {
				// Initialize pixel only once
				window.fbq("init", FB_PIXEL_ID);
				initialized.current = true;
			}
			// Track pageview on every navigation
			window.fbq("track", "PageView");
		} catch (error) {
			console.debug("Facebook Pixel tracking unavailable");
		}
	}, [pathname, searchParams]);

	if (!FB_PIXEL_ID) return null;

	return (
		<Script
			id="facebook-pixel"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
					!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
				`,
			}}
		/>
	);
}
