import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function usePageTracking() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window !== "undefined" && window.fbq) {
			window.fbq("track", "PageView");
		}
	}, [pathname, searchParams]);
} 