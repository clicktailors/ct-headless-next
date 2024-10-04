import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/date";
import CoverImage from "./CoverImage";
import Link from "next/link";
import Section from "../ui/Section";

interface HeroPostProps {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	date: string;
	excerpt: string;
	author: {
		node: {
			name: string;
			firstName: string;
			lastName: string;
			avatar: {
				url: string;
			};
		};
	};
	slug: string;
}

export default function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}: HeroPostProps) {
	return (
		<Section className="max-w-screen-md mx-auto">
			<div className="mb-8 md:mb-16">
				{coverImage && (
					<CoverImage
						title={title}
						coverImage={coverImage}
						slug={slug}
					/>
				)}
			</div>
			<div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
				<div>
					<h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
						<Link
							href={`/blog/posts/${slug}`}
							className="hover:underline"
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</h3>
					<div className="mb-4 md:mb-0 text-lg">
						<Date dateString={date} />
					</div>
				</div>
				<div>
					<div
						className="text-lg leading-relaxed mb-4"
						dangerouslySetInnerHTML={{ __html: excerpt }}
					/>
					<Avatar author={author} />
				</div>
			</div>
		</Section>
	);
}