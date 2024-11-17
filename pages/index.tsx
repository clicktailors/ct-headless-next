import HeroImage from "../public/images/marketing-hero/hero.png";
import { CalendarIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

import Home from "./Home";

const heroContent = {
	header: "Your ideas. Our code.",
	// subheader:
	// 	"At ClickTailors, we specialize in bringing your business to the next level in a world where being digital matters.",
	subheader:
		"At ClickTailors, we specialize in creating custom tailored websites and tools that bring your business to the next level in a world where being digital matters.",
	button: "Free Consultation",
	buttonLink: "/contact",
	buttonIcon: <CalendarIcon className="size-4" />,
	buttonSecondary: "Learn More",
	buttonSecondaryLink: "/blog",
	buttonSecondaryIcon: <InformationCircleIcon className="size-4" />,
	image: HeroImage,
};

const gridContent = {
	blurb: {
		sectionTitle: "Our Expertise",
		sectionHeading: "Crafting Digital Excellence",
		sectionSummary:
			"ClickTailors is a premier web design agency dedicated to creating stunning, functional websites that elevate your brand and drive business growth.",
	},
	features: [
		{
			name: "Custom Design",
			description:
				"Our team of creative designers crafts unique, visually appealing websites tailored to your brand identity and target audience.",
			icon: "PaintBrushIcon",
		},
		{
			name: "Responsive Development",
			description:
				"We build websites that look and function flawlessly across all devices, ensuring an optimal user experience for your visitors.",
			icon: "DevicePhoneMobileIcon",
		},
		{
			name: "SEO Optimization",
			description:
				"Our websites are built with search engine optimization in mind, helping your business rank higher in search results and attract more organic traffic.",
			icon: "MagnifyingGlassIcon",
		},
		{
			name: "Ongoing Support",
			description:
				"We provide continuous support and maintenance to keep your website up-to-date, secure, and performing at its best long after launch.",
			icon: "WrenchScrewdriverIcon",
		},
	],
};

const splitContent = {
	sectionTitle: "Our Design Process",
	sectionHeading: "How We Create Your Perfect Website",
	sectionSummary:
		"At ClickTailors, we follow a streamlined process to deliver stunning, functional websites that perfectly represent your brand. Here's how we work:",
	imageURL:
		"https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// lottie: {
	// 	src: "/images/dot-lottie-files/Animation-1728438809855.lottie",
	// 	loop: true,
	// 	autoplay: true,
	// 	style: {
	// 		width: "100%",
	// 		height: "100%",
	// 	},
	// },
	features: [
		{
			name: "Discovery and Planning",
			description:
				"We start by understanding your business goals, target audience, and design preferences to create a comprehensive project plan.",
			icon: "MapIcon",
		},
		{
			name: "Design Concept",
			description:
				"Our creative team develops unique design concepts that align with your brand identity and user experience requirements.",
			icon: "PaintBrushIcon",
		},
		{
			name: "Development and Integration",
			description:
				"We bring your design to life with clean, efficient code and seamlessly integrate necessary features and functionalities.",
			icon: "CodeBracketIcon",
		},
		{
			name: "Testing and Launch",
			description:
				"We rigorously test your website across devices and browsers before launching it to ensure a flawless user experience.",
			icon: "RocketLaunchIcon",
		},
	],
	// button: "Start Your Project",
	// buttonLink: "/contact",
};

export default function Index() {
	return (
		<Home
			heroContent={heroContent || {}}
			gridContent={gridContent || {}}
			splitContent={splitContent || {}}
		/>
	);
}
