import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
	const image = (
		<Image
			width={2000}
			height={1000}
			alt={`Cover Image for ${title}`}
			src={coverImage?.node.sourceUrl}
			className={cn("shadow-small rounded-xl", {
				"hover:shadow-medium transition-shadow duration-200 rounded-xl":
					slug,
			})}
			priority
		/>
	);
	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/blog/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
