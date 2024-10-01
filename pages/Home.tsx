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
				<Testimonial>
					<Testimonial.Quote>
						GitHub helps us ensure that we have our security
						controls baked into our pipelines all the way from the
						first line of code we&apos;re writing.
					</Testimonial.Quote>
					<Testimonial.Name position="Staff Security Engineer">
						David Ross
					</Testimonial.Name>
					<Testimonial.Avatar
						src="https://avatars.githubusercontent.com/u/92997159?v=4"
						alt="Circular avatar from David Ross's GitHub profile"
					/>
				</Testimonial>
				<Box
					style={{
						backgroundColor: "var(--base-color-scale-gray-2)",
					}}
					padding="normal"
				>
					<Bento>
						<Bento.Item
							columnSpan={12}
							rowSpan={2}
							children={<h1>Hello</h1>}
						/>
						<Bento.Item columnSpan={7} rowSpan={2}>
							<h1>Hello</h1>
						</Bento.Item>
						<Bento.Item
							columnSpan={5}
							rowSpan={2}
							children={<h1>Hello</h1>}
						/>
						<Bento.Item columnSpan={12} rowSpan={2} />
					</Bento>
				</Box>
			</Container>
		</Layout>
	);
}
