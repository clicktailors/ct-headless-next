import PostPreview from "./PostPreview";
import Container from "../ui/Container";
import Section from "../ui/Section";

export default function MoreStories({ posts }: { posts: any[] }) {
	return (
		<Section>
			<Container>
				<h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
					More Stories
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
					{posts.map(({ node }) => (
						<PostPreview
							key={node.slug}
							title={node.title}
							coverImage={node.featuredImage}
							date={node.date}
							author={node.author}
							slug={node.slug}
							excerpt={node.excerpt}
						/>
					))}
				</div>
			</Container>
		</Section>
	);
}
