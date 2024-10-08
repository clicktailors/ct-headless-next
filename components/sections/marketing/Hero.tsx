import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
	useParallaxEffect,
	handleSmoothScroll,
} from "../../../utils/hooks/effects";
import { styles } from "../../../lib/styles";

import HeroImage from "../../../public/images/marketing-hero/hero.png";

import { CalendarIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import Section from "../../ui/Section";
import Container from "../../ui/Container";

export default function Hero() {
	const content = {
		header: "A Website That Sets You Apart.",
		subheader:
			"At ClickTailors, we specialize in bringing your business to the next level in a world where being digital matters.",
		button: "Free Consultation",
		buttonLink: "/contact",
		buttonIcon: <CalendarIcon className="size-4" />,
		buttonSecondary: "Learn More",
		buttonSecondaryLink: "/about",
		buttonSecondaryIcon: <InformationCircleIcon className="size-4" />,
		image: HeroImage,
	};

	const { hero, buttonSecondary } = styles;

	return (
		<Section>
			<Container>
				<div className="hero min-h-[60vh] mt-12">
					{/* Glowing gradient background with radial fade */}
					<motion.div
						className={`${styles.blur} ${styles.blurColor}`}
					></motion.div>

					<div className={hero.main}>
						{/* Hero text */}
						<div className={hero.textArea}>
							<h1 className={hero.header}>{content.header}</h1>
							<p className={hero.subheader}>
								{content.subheader}
							</p>
							<div className="flex flex-row gap-4 lg:flex-row">
								<button className={hero.button}>
									<Link
										href={content.buttonLink}
										onClick={handleSmoothScroll}
										className="flex items-center gap-2"
									>
										{content.buttonIcon}
										{content.button}
									</Link>
								</button>
								<button className={hero.buttonOutline}>
									<Link
										href={content.buttonSecondaryLink}
										onClick={handleSmoothScroll}
										className="flex items-center gap-2"
									>
										{content.buttonSecondaryIcon}
										{content.buttonSecondary}
									</Link>
								</button>
							</div>
						</div>

						{/* Hero image */}
						<div className="w-full lg:w-1/2 relative h-96 lg:h-96">
							<Image
								src={content.image}
								alt="Hero"
								layout="fill"
								objectFit="contain"
								className={hero.image}
							/>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
}
