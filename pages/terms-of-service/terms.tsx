import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import { styles } from "../../lib/styles";

export default function Terms() {
	const section = styles.section;
	const h1 = styles.h1;
	const h2 = styles.h2;
	return (
		<Section id="terms-of-service">
			<Container className="py-12">
				<h1 className={h1}>AGREEMENT TO OUR LEGAL TERMS</h1>
				<p id="last-updated">Last updated October 10, 2023</p>

				<section id="company-info" className={section}>
					<h2 className={h2}>Company Information</h2>
					<p>
						We are Redwood Creative, LLC, doing business as Click
						Tailors ("Company," "we," "us," "our"), a company
						registered in Wyoming, United States at 30 N. Gould St.
						Ste N, Sheridan, WY 82801.
					</p>
					<p>
						We operate the website https://clicktailors.com (the
						"Site"), as well as any other related products and
						services that refer or link to these legal terms (the
						"Legal Terms") (collectively, the "Services").
					</p>
				</section>

				<section id="company-services" className={section}>
					<h2 className={h2}>Our Services</h2>
					<p>
						At Click Tailors, we're dedicated to helping small
						businesses thrive in the digital world. Our mission is
						to provide top-notch web development services that
						empower your online presence. Here's a breakdown of what
						we offer:
					</p>
					<ol>
						<li>
							<strong>Web Development:</strong> We specialize in
							building and revitalizing websites tailored to the
							unique needs of small businesses. Whether you're
							starting from scratch or need a makeover for your
							existing site, we've got you covered.
						</li>
						<li>
							<strong>Hosting Services:</strong> We understand the
							importance of a reliable hosting environment. That's
							why we offer hosting solutions designed to keep your
							website running smoothly, ensuring your online
							presence is always accessible to your audience.
						</li>
						<li>
							<strong>SEO Optimization:</strong> Visibility in
							search engines is crucial for success online. Our
							SEO optimization services are aimed at improving
							your website's ranking, making sure your potential
							customers can find you effortlessly.
						</li>
					</ol>
					<p>
						When you engage with Click Tailors, you're choosing a
						partner committed to your digital success. Feel free to
						explore the details of our terms and conditions below to
						better understand how we operate and the commitments we
						make to you.
					</p>
				</section>

				<section id="contact-info" className={section}>
					<h2 className={h2}>Contact Information</h2>
					<p>You can contact us by:</p>
					<ul>
						<li>Phone: ‭+1 (307) 429-2486‬</li>
						<li>Email: contact@clicktailors.com</li>
						<li>
							Mail: 30 N. Gould St. Ste N, Sheridan, WY 82801,
							United States
						</li>
					</ul>
				</section>

				<section id="legal-agreement" className={section}>
					<h2 className={h2}>Legal Agreement</h2>
					<p>
						These Legal Terms constitute a legally binding agreement
						made between you, whether personally or on behalf of an
						entity ("you"), and Redwood Creative, LLC, concerning
						your access to and use of the Services. You agree that
						by accessing the Services, you have read, understood,
						and agreed to be bound by all of these Legal Terms. IF
						YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU
						ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU
						MUST DISCONTINUE USE IMMEDIATELY. YOU DO NOT AGREE WITH
						ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
						PROHIBITED FROM USING THE SERVICES AND YOU MUST
						DISCONTINUE USE IMMEDIATELY.
					</p>
					<p>
						We will provide you with prior notice of any scheduled
						changes to the Services you are using. The modified
						Legal Terms will become effective upon posting or
						notifying you by contact@clicktailors.com, as stated in
						the email message. By continuing to use the Services
						after the effective date of any changes, you agree to be
						bound by the modified terms.
					</p>
					<p>
						The Services are intended for users who are at least 18
						years old. Persons under the age of 18 are not permitted
						to use or register for the Services.
					</p>
					<p>
						We recommend that you print a copy of these Legal Terms
						for your records.
					</p>
				</section>

				<section id="table-of-contents" className={section}>
					<h2 className={h2}>TABLE OF CONTENTS</h2>
					<ol>
						<li>OUR SERVICES</li>
						<li>INTELLECTUAL PROPERTY RIGHTS</li>
						<li>USER REPRESENTATIONS</li>
						<li>USER REGISTRATION</li>
						<li>PRODUCTS</li>
						<li>PURCHASES AND PAYMENT</li>
						<li>REFUNDS POLICY</li>
						<li>PROHIBITED ACTIVITIES</li>
						<li>USER GENERATED CONTRIBUTIONS</li>
						<li>CONTRIBUTION LICENSE</li>
						<li>THIRD-PARTY WEBSITES AND CONTENT</li>
						<li>SERVICES MANAGEMENT</li>
						<li>PRIVACY POLICY</li>
						<li>TERM AND TERMINATION</li>
						<li>MODIFICATIONS AND INTERRUPTIONS</li>
						<li>GOVERNING LAW</li>
						<li>DISPUTE RESOLUTION</li>
						<li>CORRECTIONS</li>
						<li>DISCLAIMER</li>
						<li>LIMITATIONS OF LIABILITY</li>
						<li>INDEMNIFICATION</li>
						<li>USER DATA</li>
						<li>
							ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
							SIGNATURES
						</li>
						<li>CALIFORNIA USERS AND RESIDENTS</li>
						<li>MISCELLANEOUS</li>
						<li>CONTACT US</li>
					</ol>
				</section>

				{/* Add the rest of the sections here, following the same structure */}
			</Container>
		</Section>
	);
}
