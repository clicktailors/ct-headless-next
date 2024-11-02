import Terms from "./terms";
import { SITE_NAME } from "../../lib/constants";

import Layout from "../layout";
import Head from "next/head";
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";

const TermsOfService = () => {
	const pageTitle = "Terms of Service";

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Section>
				<Container>
					<Terms />
				</Container>
			</Section>
		</Layout>
	);
};

export default TermsOfService;
