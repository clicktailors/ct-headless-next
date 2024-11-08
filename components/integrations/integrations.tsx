"use client";

import ThirdPartyScripts from "./ThirdPartyScripts";
import PageTracker from "./facebook/PageTracker";
import { GoogleAnalytics } from "@next/third-parties/google";
export default function Integrations() {
	return (
		<>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
			<ThirdPartyScripts />
			<PageTracker />
		</>
	);
}
