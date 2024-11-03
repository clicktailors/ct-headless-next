import Section from "../../ui/Section";
import Container from "../../ui/Container";

export default function Intro({
	pageTitle,
	icon,
	description,
	center = false,
}: {
	pageTitle: string;
	icon?: React.ReactNode;
	description?: string;
	center?: boolean;
}) {
	return (
		<Section id="intro">
			<Container>
				<h1
					className={`tracking-tighter text-6xl md:text-7xl font-bold leading-tight my-12 ${
						center && "text-center"
					}`}
				>
					{icon && <span className="mr-4">{icon}</span>}
					{pageTitle}
				</h1>
				{description && (
					<p className="text-md text-base-content/80 mt-6 text-center max-w-lg">
						{description}
					</p>
				)}
			</Container>
		</Section>
	);
}
