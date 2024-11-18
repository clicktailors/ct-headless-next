"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function FacebookPageTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		try {
			if (typeof window !== "undefined" && window.fbq) {
				window.fbq("track", "PageView");
			}
		} catch (error) {
			console.debug("Facebook Pixel tracking unavailable");
		}
	}, [pathname, searchParams]);

	return null;
}
