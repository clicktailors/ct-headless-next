"use client";

import ThirdPartyScripts from "./ThirdPartyScripts";
import PageTracker from "./facebook/PageTracker";

export default function Integrations() {
	return (
		<>
			<ThirdPartyScripts />
			<PageTracker />
		</>
	);
}
