import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/date";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";
import Categories from "./Categories";

export default function PostHeader({
	title,
	coverImage,
	date,
	author,
	categories,
}: {
	title: string;
	coverImage: { node: { sourceUrl: string } };
	date: string;
	author: any;
	categories: any;
}) {
	return (
		<div className="max-w-4xl mx-auto">
			<PostTitle>{title}</PostTitle>
			<div className="md:mb-12">
				<Avatar author={author} />
				<div className="mb-6 text-sm">
					Posted <Date dateString={date} />
					<Categories categories={categories} />
				</div>
			</div>
			<div className="mb-8 md:mb-16 sm:mx-0 ">
				{coverImage && (
					<CoverImage title={title} coverImage={coverImage} />
				)}
			</div>
		</div>
	);
}
