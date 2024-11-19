import Head from "next/head";
import { GetStaticProps } from "next";
import MoreStories from "../../components/blog/MoreStories";
import HeroPost from "../../components/blog/HeroPost";
import Intro from "../../components/sections/core/Intro";
import Layout from "../layout";
import { getAllPostsForHome } from "../api/wp-api";
import { SITE_NAME } from "../../lib/constants";
import Newsletter from "../../components/sections/marketing/Newsletter";
import { useRouter } from "next/router";

export default function Index({
	allPosts: { edges, pageInfo },
	currentPage,
}: {
	allPosts: {
		edges: any[];
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string;
		};
	};
	currentPage: number;
}) {
	const router = useRouter();
	const heroPost = edges[0]?.node;
	const morePosts = edges.slice(1);
	const pageTitle = "Featured Posts";

	const heroPostProps = {
		title: heroPost.title,
		coverImage: heroPost.featuredImage,
		date: heroPost.date,
		author: heroPost.author,
		slug: heroPost.slug,
		excerpt: heroPost.excerpt,
	};

	const paginationProps = {
		hasNextPage: pageInfo.hasNextPage,
		currentPage: currentPage,
	};

	const Pagination = () => {
		return (
			<div className="flex justify-center my-8">
				<div className="join">
					<button
						onClick={() =>
							router.push(`/blog?page=${currentPage - 1}`)
						}
						disabled={currentPage <= 1}
						className="join-item btn btn-outline"
					>
						«
					</button>
					<button
						className="join-item btn btn-outline no-animation"
						disabled
					>
						Page {currentPage}
					</button>
					<button
						onClick={() =>
							router.push(`/blog?page=${currentPage + 1}`)
						}
						disabled={!pageInfo.hasNextPage}
						className="join-item btn btn-outline"
					>
						»
					</button>
				</div>
			</div>
		);
	};

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			{/* Page Title Header */}
			<Intro pageTitle={pageTitle} />
			{/* Hero Post */}
			{heroPost && <HeroPost {...heroPostProps} />}
			{/* More Stories */}
			{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			{/* Pagination */}
			<Pagination />
			{/* Newsletter */}
			<Newsletter />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const page = 1; // For static generation, we'll always show first page
	const allPosts = await getAllPostsForHome(preview, page);

	return {
		props: {
			allPosts,
			currentPage: page,
			preview,
		},
		revalidate: 10,
	};
};
