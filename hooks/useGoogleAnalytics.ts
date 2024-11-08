"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
	interface Window {
		gtag: (
			command: string,
			action: string,
			params: Record<string, any>
		) => void;
	}
}

export function useGoogleAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window.gtag !== "undefined") {
			window.gtag("event", "page_view", {
				page_path: pathname,
				page_search: searchParams?.toString(),
			});
		}
	}, [pathname, searchParams]);
} 