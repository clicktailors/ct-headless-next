import FacebookNoscript from "./facebook/noscript";
import ThirdPartyScripts from "./ThirdPartyScripts";
import ThirdPartyMetaTags from "./ThirdPartyMetaTags";
import PageTracker from "./facebook/PageTracker";

export default function Integrations() {
	return (
		<>
			<FacebookNoscript />
			<ThirdPartyScripts />
			<ThirdPartyMetaTags />
			<PageTracker />
		</>
	);
}
