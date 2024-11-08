"use client";

import ThirdPartyScripts from "./ThirdPartyScripts";
import PageTracker from "./facebook/PageTracker";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useGoogleAnalytics } from "../../hooks/useGoogleAnalytics";

export default function Integrations() {
	const gaId = process.env.NEXT_PUBLIC_GA_ID;
	useGoogleAnalytics();

	if (!gaId) {
		console.warn("Google Analytics ID is not defined");
		return null;
	}

	return (
		<>
			<GoogleAnalytics gaId={gaId} />
			<ThirdPartyScripts />
			<PageTracker />
		</>
	);
}
