import React from "react";
import Head from "next/head";
import Intro from "../../components/sections/core/Intro";
import Layout from "../../components/layout";
import Container from "../../components/ui/container";
import { SITE_NAME } from "../../lib/constants";
import ContactForm from "./ContactForm";

const Contact = () => {
	const pageTitle = "Get in Touch";

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={pageTitle} />
				<ContactForm />
			</Container>
		</Layout>
	);
};

export default Contact;
