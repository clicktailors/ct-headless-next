export default function Intro({
	pageTitle,
	icon,
	description,
}: {
	pageTitle: string;
	icon?: React.ReactNode;
	description?: string;
}) {
	return (
		<section className="flex-col flex justify-center items-center md:justify-between mt-16 mb-16 md:mb-12">
			<h1 className="tracking-tighter text-6xl md:text-7xl font-bold leading-tight flex items-center gap-4">
				{icon ? icon : null}
				{pageTitle}.{/* {SITE_NAME} */}
			</h1>
			{description ? (
				<p className="text-md text-base-content/80 mt-6 text-center max-w-lg">
					{description}
				</p>
			) : null}
		</section>
	);
}
