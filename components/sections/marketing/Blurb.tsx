export default function Blurb({
	blurb,
}: {
	blurb: {
		sectionTitle: string;
		sectionHeading: string;
		sectionSummary: string;
	};
}) {
	const { sectionTitle, sectionHeading, sectionSummary } = blurb;
	return (
		<div className="mx-auto max-w-2xl lg:text-center">
			<h2 className="text-secondary font-semibold leading-7">
				{sectionTitle}
			</h2>
			<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
				{sectionHeading}
			</p>
			<p className="mt-6 text-lg leading-8">{sectionSummary}</p>
		</div>
	);
}
