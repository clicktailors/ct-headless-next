import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/ui/Container";
import Layout from "../components/layout";
import { getAllPostsForHome } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import Intro from "../components/sections/core/Intro";
import MarketingSplit from "../components/sections/marketing/MarketingSplit";
import BlurbTwoByTwoGrid from "../components/sections/marketing/BlurbTwoByTwoGrid";
import Hero from "../components/sections/marketing/Hero";
import Newsletter from "../components/sections/marketing/Newsletter";
import Listings from "../components/sections/marketing/Listings";
import { Testimonial, Box, Bento } from "@primer/react-brand";

export default function Home({
	gridContent,
	splitContent,
	preview = false,
}: {
	gridContent: any;
	splitContent: any;
	preview?: boolean;
}) {
	const pageTitle = SITE_NAME;

	return (
		<Layout>
			<Head>
				<title>{`${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Hero />
				<BlurbTwoByTwoGrid content={gridContent} />
				<MarketingSplit content={splitContent} />
				<Newsletter />
			</Container>
		</Layout>
	);
}
