import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";
import * as icons from "@heroicons/react/24/outline";

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

export default function MarketingSplit({ content }: { content: MarketingSplitContent }) {
	return (
		<div className="overflow-hidden py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					<div className="lg:pr-8 lg:pt-4">
						<div className="lg:max-w-lg">
							<h2 className="font-semibold leading-7 text-primary">
								{content.sectionTitle}
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
								{content.sectionHeading}
							</p>
							<p className="mt-6 text-lg leading-8">
								{content.sectionSummary}
							</p>
							<dl className="mt-10 max-w-xl space-y-8 leading-7 lg:max-w-none">
								{content.features.map((feature) => (
									<div
										key={feature.name}
										className="relative pl-9"
									>
										<dt className="inline font-semibold">
											{React.createElement(
												icons[feature.icon],
												{
													className:
														"absolute left-1 top-1 h-5 w-5 text-secondary",
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
						<div className="mt-10 flex justify-center">
							{/* <button className="btn btn-primary">
								<Link href="/applications">
									{content.button}
								</Link>
							</button> */}
						</div>
					</div>
					<img
						src={content.imageURL}
						alt="Product screenshot"
						className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 lg:mt-16"
						width={2432}
						height={1442}
					/>
				</div>
			</div>
		</div>
	);
}
