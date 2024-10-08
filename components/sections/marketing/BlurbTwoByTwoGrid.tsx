import React from "react";
import Blurb from "./Blurb";
import TwoByTwoGrid from "./TwoByTwoGrid";
import { convertToId } from "../../../utils/formatters";
import Section from "../../ui/Section";
import Container from "../../ui/Container";

interface BlurbTwoByTwoGridContent {
	blurb?: {
		sectionTitle?: string;
		sectionHeading?: string;
		sectionSummary?: string;
	};
	features: Array<{ name: string; icon: string; description: string }>;
}

export default function BlurbTwoByTwoGrid({
	content = {
		blurb: {},
		features: [],
	},
}: {
	content: BlurbTwoByTwoGridContent;
}) {
	const { blurb = {}, features = [] } = content;
	const sectionTitle = blurb.sectionTitle || "Default Section Title";

	return (
		<Section>
			<Container>
				<div id={convertToId(sectionTitle)} className="py-12 sm:py-12">
					<Blurb blurb={blurb} />
					<TwoByTwoGrid features={features} />
				</div>
			</Container>
		</Section>
	);
}
