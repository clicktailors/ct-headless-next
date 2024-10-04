import Avatar from "../ui/Images/Avatar";
import Date from "../sections/misc/date";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";
import Categories from "./Categories";
import Section from "../ui/Section";

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
		<Section>
			<div className="max-w-4xl mx-auto flex xl:flex-row flex-col items-center justify-center gap-12 grid-cols-12">
				<div className="md:mb-12 col-span-9">
					{" "}
					{/* Changed from col-span-8 to col-span-9 */}
					<PostTitle>{title}</PostTitle>
					<Avatar author={author} />
					<div className="mb-6 text-sm">
						Posted <Date dateString={date} />
						<Categories categories={categories} />
					</div>
				</div>
				<div className="mb-8 md:mb-16 sm:mx-0 max-w-md align-middle mx-auto col-span-3">
					{" "}
					{/* Changed from max-w-xl to max-w-md and col-span-4 to col-span-3 */}
					{coverImage && (
						<CoverImage title={title} coverImage={coverImage} />
					)}
				</div>
			</div>
		</Section>
	);
}
