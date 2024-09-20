import React from "react";
import * as icons from "@heroicons/react/24/outline";

export default function TwoByTwoGrid({
	features,
}: {
	features: Array<{ name: string; icon: string; description: string }>;
}) {
	return (
		<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
			<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
				{features.map((feature) => (
					<div key={feature.name} className="relative pl-16">
						<dt className="text-base font-semibold leading-7">
							<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
								{React.createElement(
									icons[feature.icon as keyof typeof icons],
									{
										className: "h-6 w-6 text-white",
										"aria-hidden": "true",
									}
								)}
							</div>
							{feature.name}
						</dt>
						<dd className="text mt-2 leading-7">
							{feature.description}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
