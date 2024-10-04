import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/ui/Container";
import Layout from "../components/layout";
import { getAllPostsForHome } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import MarketingSplit from "../components/sections/marketing/MarketingSplit";
import BlurbTwoByTwoGrid from "../components/sections/marketing/BlurbTwoByTwoGrid";
import Hero from "../components/sections/marketing/Hero";
import Newsletter from "../components/sections/marketing/Newsletter";

export default function Home({
	gridContent,
	splitContent,
	preview = false,
}: {
	gridContent: any;
	splitContent: any;
	preview?: boolean;
}) {
	return (
		<Layout>
			<Head>
				<title>{`${SITE_NAME}`}</title>
			</Head>
			<Hero />
			<BlurbTwoByTwoGrid content={gridContent} />
			<MarketingSplit content={splitContent} />
			<Newsletter />
		</Layout>
	);
}
