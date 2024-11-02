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
	const pageTitle = "Blog";

	const heroPostProps = {
		title: heroPost.title,
		coverImage: heroPost.featuredImage,
		date: heroPost.date,
		author: heroPost.author,
		slug: heroPost.slug,
		excerpt: heroPost.excerpt,
	};

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			{/* Page Title Header */}
			{/* <Intro pageTitle={pageTitle} /> */}
			{/* Hero Post */}
			{heroPost && <HeroPost {...heroPostProps} />}
			{/* More Stories */}
			{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			{/* Pagination */}
			<div className="flex justify-between max-w-2xl mx-auto my-8">
				<button
					onClick={() => router.push(`/blog?page=${currentPage - 1}`)}
					disabled={currentPage <= 1}
					className="px-4 py-2 text-sm disabled:opacity-50"
				>
					Previous
				</button>
				<span>Page {currentPage}</span>
				<button
					onClick={() => router.push(`/blog?page=${currentPage + 1}`)}
					disabled={!pageInfo.hasNextPage}
					className="px-4 py-2 text-sm disabled:opacity-50"
				>
					Next
				</button>
			</div>
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
