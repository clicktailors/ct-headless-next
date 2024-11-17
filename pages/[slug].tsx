import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "./layout";
import { getAllPages, getPageBySlug } from "./api/wp-api";
import { SITE_NAME } from "../lib/constants";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";

interface PageProps {
	page: {
		title: string;
		content: string;
		modified: string;
	};
}

export default function Page({ page }: PageProps) {
	return (
		<Layout>
			<Head>
				<title>{`${page.title} | ${SITE_NAME}`}</title>
			</Head>
			<Section>
				<Container className="py-12">
					<h1 className="text-4xl font-bold mb-8">{page.title}</h1>
					<div
						className="prose max-w-none"
						dangerouslySetInnerHTML={{ __html: page.content }}
					/>
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = await getPageBySlug(params?.slug as string);

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			page,
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allPages = await getAllPages();

	return {
		paths: allPages.edges.map(({ node }: any) => `/${node.slug}`) || [],
		fallback: "blocking",
	};
};
