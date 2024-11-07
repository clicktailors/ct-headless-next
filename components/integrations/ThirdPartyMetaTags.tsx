import { thirdPartyMetaTags } from "../../lib/third-party";

export default function ThirdPartyMetaTags() {
	return (
		<>
			{thirdPartyMetaTags.map((tag) => (
				<meta key={tag.id} {...tag} />
			))}
		</>
	);
}
