import Head from "next/head";
import { GetStaticProps } from "next";
import Layout from "./layout";
import { getAllPostsForHome } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import * as Marketing from "../components/sections/marketing/_module";
import { MarketingSplitContent } from "../components/sections/marketing/MarketingSplit";
import { BlurbTwoByTwoGridContent } from "../components/sections/marketing/BlurbTwoByTwoGrid";

interface HomeProps {
	preview?: boolean;
	allPosts?: any[];
	heroContent?: Record<string, any>;
	gridContent?: BlurbTwoByTwoGridContent;
	splitContent?: MarketingSplitContent;
}

export default function Home({
	preview = false,
	allPosts = [],
	heroContent,
	gridContent,
	splitContent,
}: HomeProps) {
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
				<Marketing.Newsletter />
			</main>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	try {
		const allPosts = await getAllPostsForHome(preview);

		return {
			props: {
				allPosts: allPosts || [],
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
				allPosts: [],
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
