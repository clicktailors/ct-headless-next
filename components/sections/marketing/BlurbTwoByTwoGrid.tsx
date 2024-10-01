import React from "react";
import Blurb from "./Blurb";
import TwoByTwoGrid from "./TwoByTwoGrid";
import { convertToId } from "../../../utils/formatters";

interface BlurbTwoByTwoGridContent {
	blurb: any;
	features: any;
}

export default function BlurbTwoByTwoGrid({
	content,
}: {
	content: BlurbTwoByTwoGridContent;
}) {
	const { blurb, features } = content;
	return (
		<div id={convertToId(blurb.sectionTitle)} className="py-12 sm:py-12">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Blurb blurb={blurb} />
				<TwoByTwoGrid features={features} />
			</div>
		</div>
	);
}
