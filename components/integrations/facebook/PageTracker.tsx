"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function FacebookPageTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isFirstRender = useRef(true);

	useEffect(() => {
		// Skip the first render because the pixel script already tracks initial pageview
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		console.log("FacebookPageTracker", pathname, searchParams);

		if (typeof window !== "undefined" && window.fbq) {
			window.fbq("track", "PageView");
		}
	}, [pathname, searchParams]);

	return null;
}