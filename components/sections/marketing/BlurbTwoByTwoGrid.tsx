import React from "react";
import Blurb from "./Blurb";
import TwoByTwoGrid from "./TwoByTwoGrid";

export default function BlurbTwoByTwoGrid({
	content,
	id,
}: {
	content: { blurb: any; features: any };
	id: string;
}) {
	const { blurb, features } = content;
	return (
		<div id={id} className="py-12 sm:py-12">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Blurb blurb={blurb} />
				<TwoByTwoGrid features={features} />
			</div>
		</div>
	);
}
