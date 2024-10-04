import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";
import * as icons from "@heroicons/react/24/outline";
import { convertToId } from "../../../utils/formatters";
import Section from "../../ui/Section";
// ~SAMPLE CONTENT
// const sampleContent = {
// 	sectionTitle: "",
// 	sectionHeading: "",
// 	sectionSummary:
// 		"",
// 	imageURL:
// 		"",
// 	features: [
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "MapIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "BuildingLibraryIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "PuzzlePieceIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "UserGroupIcon",
// 		},
// 	],
// };

interface MarketingSplitContent {
	button?: string;
	buttonLink?: string;
	sectionTitle: string;
	sectionHeading: string;
	sectionSummary: string;
	imageURL: string;
	features: {
		name: string;
		description: string;
		icon: keyof typeof icons;
	}[];
}

export default function MarketingSplit({
	content = {
		sectionTitle: "",
		sectionHeading: "",
		sectionSummary: "",
		imageURL: "",
		features: [],
	},
}: {
	content: MarketingSplitContent;
}) {
	const {
		sectionTitle = "",
		sectionHeading = "",
		sectionSummary = "",
		imageURL = "",
		features = [],
		button,
		buttonLink,
	} = content || {};

	if (!sectionTitle) return null; // Don't render if there's no content

	return (
		<Section>
			<div
				id={convertToId(sectionTitle)}
				className="overflow-hidden py-24 sm:py-32"
			>
				<div className="mx-auto max-w-7xl lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						<div className="lg:pr-8 lg:pt-4">
							{/* Content */}
							<div className="lg:max-w-lg">
								{/* Title */}
								<h2
									id={convertToId(sectionTitle)}
									className="font-semibold leading-7 text-primary"
								>
									{sectionTitle}
								</h2>
								{/* Heading */}
								<p
									id={convertToId(sectionHeading)}
									className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
								>
									{sectionHeading}
								</p>
								{/* Summary */}
								<p
									id={convertToId(sectionSummary)}
									className="mt-6 text-lg leading-8"
								>
									{sectionSummary}
								</p>
								{/* Features */}
								<dl className="mt-10 max-w-xl space-y-8 leading-7 lg:max-w-none">
									{features.map((feature) => (
										<div
											key={feature.name}
											className="relative pl-9"
										>
											<dt className="inline font-semibold">
												{React.createElement(
													icons[feature.icon],
													{
														className:
															"absolute left-1 top-1 h-5 w-5 text-primary",
														"aria-hidden": "true",
													}
												)}
											</dt>{" "}
											<dd className="inline">
												{feature.description}
											</dd>
										</div>
									))}
								</dl>
							</div>

							{/* Conditionally render the button */}
							{button && buttonLink && (
								<div
									id={convertToId(button)}
									className="mt-10 flex justify-center"
								>
									<button className="btn btn-primary">
										<Link href={buttonLink}>{button}</Link>
									</button>
								</div>
							)}
						</div>
						<img
							src={imageURL}
							alt="Product screenshot"
							className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 lg:mt-16"
							width={2432}
							height={1442}
						/>
					</div>
				</div>
			</div>
		</Section>
	);
}
