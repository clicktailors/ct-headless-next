"use client";

import ThirdPartyScripts from "./ThirdPartyScripts";
import FacebookPageTracker from "./facebook/PageTracker";
import GoogleAnalytics from "./google/GoogleAnalytics";

export default function Integrations() {
	return (
		<>
			<GoogleAnalytics />
			<ThirdPartyScripts />
			<FacebookPageTracker />
		</>
	);
}
