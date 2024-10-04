import Head from "next/head";
import { GetStaticProps } from "next";
import Section from "../../components/ui/Section";
import MoreStories from "../../components/blog/MoreStories";
import HeroPost from "../../components/blog/HeroPost";
import Intro from "../../components/sections/core/Intro";
import Layout from "../../components/layout";
import { getAllPostsForHome } from "../api/wp-api";
import { SITE_NAME } from "../../lib/constants";

export default function Index({
	allPosts: { edges },
}: {
	allPosts: { edges: any };
}) {
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
			<Section>
				{/* Page Title Header */}
				<Intro pageTitle={pageTitle} />

				{/* Hero Post */}
				{heroPost && <HeroPost {...heroPostProps} />}

				{/* More Stories */}
				{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			</Section>
		</Layout>
	);
}
export const getStaticProps: GetStaticProps = async () => {
	const allPosts = await getAllPostsForHome(true);

	return {
		props: { allPosts },
		revalidate: 10,
	};
};
