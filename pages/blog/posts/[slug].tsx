import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../../components/ui/container";
import PostBody from "../../../components/blog/PostBody";
import MoreStories from "../../../components/blog/MoreStories";
import Header from "../../../components/sections/core/Header";
import PostHeader from "../../../components/blog/PostHeader";
import SectionSeparator from "../../../components/ui/SectionSeparator";
import Layout from "../../../components/layout";
import PostTitle from "../../../components/blog/PostTitle";
import Tags from "../../../components/blog/Tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../../lib/wp-api";
import { SITE_NAME } from "../../../lib/constants";

export default function Post({ post, posts }: { post: any; posts: any }) {
	const router = useRouter();
	const morePosts = posts?.edges;

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout>
			<Container>
				{/* <Header /> */}
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article>
							<Head>
								<title>{`${post.title} | ${SITE_NAME}`}</title>
								<meta
									property="og:image"
									content={post.featuredImage?.node.sourceUrl}
								/>
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.featuredImage}
								date={post.date}
								author={post.author}
								categories={post.categories}
							/>
							<PostBody content={post.content} />
							<footer>
								{post.tags.edges.length > 0 && (
									<Tags tags={post.tags} />
								)}
							</footer>
						</article>
						{morePosts.length > 0 && <SectionSeparator />}
						{morePosts.length > 0 && (
							<MoreStories posts={morePosts} />
						)}
					</>
				)}
			</Container>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview = false,
	previewData,
}) => {
	const data = await getPostAndMorePosts(
		params?.slug as string,
		preview,
		previewData
	);

	return {
		props: {
			preview,
			post: data.post,
			posts: data.posts,
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPostsWithSlug();

	return {
		paths:
			allPosts.edges.map(
				({ node }: { node: any }) => `/blog/posts/${node.slug}`
			) || [],
		fallback: true,
	};
};