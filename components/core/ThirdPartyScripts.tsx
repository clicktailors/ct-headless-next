"use client";

import Script from "next/script";
import { thirdPartyScripts } from "../../lib/third-party-scripts";

export default function ThirdPartyScripts() {
	return (
		<>
			{thirdPartyScripts.map((script) => (
				<Script
					key={script.id}
					id={script.id}
					strategy={script.strategy}
					src={script.src}
					dangerouslySetInnerHTML={
						script.innerHTML
							? { __html: script.innerHTML }
							: undefined
					}
					async={script.async}
					defer={script.defer}
					nonce={script.nonce}
				/>
			))}
		</>
	);
}
