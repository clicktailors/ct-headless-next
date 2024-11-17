import Head from "next/head";
import { GetStaticProps } from "next";
import Layout from "./layout";
import { getAllPostsForHome } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import * as Marketing from "../components/sections/marketing/_module";

export default function Home({
	heroContent = {},
	gridContent = {},
	splitContent = {},
	preview = false,
	allPosts = [],
}: {
	heroContent: any;
	gridContent: any;
	splitContent: any;
	preview?: boolean;
	allPosts?: any;
}) {
	return (
		<>
			<Head>
				<title>{`${SITE_NAME}`}</title>
			</Head>
			<main>
				{heroContent && <Marketing.Hero content={heroContent} />}
				{gridContent && (
					<Marketing.Splits.BlurbTwoByTwoGrid content={gridContent} />
				)}
				{splitContent && (
					<Marketing.Splits.MarketingSplit content={splitContent} />
				)}
				<Marketing.Newsletter />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	try {
		const allPosts = await getAllPostsForHome(preview);

		return {
			props: {
				allPosts,
				preview,
				// Add other props here
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error("Error in getStaticProps:", error);
		return {
			props: {
				allPosts: [],
				preview: false,
			},
			revalidate: 10,
		};
	}
};
