import Head from "next/head";
import { GetStaticProps } from "next";
import Layout from "./layout";
import { getAllPostsForHome } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import * as Marketing from "../components/sections/marketing/_module";
import { MarketingSplitContent } from "../components/sections/marketing/MarketingSplit";
import { BlurbTwoByTwoGridContent } from "../components/sections/marketing/BlurbTwoByTwoGrid";
import BlogCarousel from "../components/blog/BlogCarousel";

interface HomeProps {
	preview?: boolean;
	allPosts?: {
		edges: any[];
		pageInfo?: {
			hasNextPage: boolean;
			endCursor: string;
		};
	};
	heroContent?: Record<string, any>;
	gridContent?: BlurbTwoByTwoGridContent;
	splitContent?: MarketingSplitContent;
}

export default function Home({
	preview = false,
	allPosts = { edges: [] },
	heroContent,
	gridContent,
	splitContent,
}: HomeProps) {
	const recentPosts = allPosts?.edges?.slice(0, 6) || [];
	console.log(recentPosts, allPosts);

	return (
		<Layout>
			<Head>
				<title>{`${SITE_NAME}`}</title>
			</Head>
			<main>
				{heroContent && Object.keys(heroContent).length > 0 && (
					<Marketing.Hero content={heroContent} />
				)}
				{gridContent && Object.keys(gridContent).length > 0 && (
					<Marketing.Splits.BlurbTwoByTwoGrid content={gridContent} />
				)}
				{splitContent && Object.keys(splitContent).length > 0 && (
					<Marketing.Splits.MarketingSplit content={splitContent} />
				)}
				{recentPosts.length > 0 && <BlogCarousel posts={recentPosts} />}
				<Marketing.Newsletter />
			</main>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	try {
		const page = 1;
		const allPosts = await getAllPostsForHome(preview, page);
		console.log("getAllPostsForHome response:", allPosts);

		return {
			props: {
				allPosts,
				preview,
				heroContent: {},
				gridContent: {
					blurb: {
						sectionTitle: "",
						sectionHeading: "",
						sectionSummary: "",
					},
					features: [],
				} as BlurbTwoByTwoGridContent,
				splitContent: {
					sectionTitle: "",
					sectionHeading: "",
					sectionSummary: "",
					features: [],
					imagePosition: "right",
				},
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error("Error in getStaticProps:", error);
		return {
			props: {
				allPosts: { edges: [] },
				preview: false,
				heroContent: {},
				gridContent: {
					blurb: {
						sectionTitle: "",
						sectionHeading: "",
						sectionSummary: "",
					},
					features: [],
				} as BlurbTwoByTwoGridContent,
				splitContent: {
					sectionTitle: "",
					sectionHeading: "",
					sectionSummary: "",
					features: [],
					imagePosition: "right",
				},
			},
			revalidate: 10,
		};
	}
};
