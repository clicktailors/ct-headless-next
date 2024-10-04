import Home from "./Home";

const gridContent = {
	blurb: {
		sectionTitle: "Our Mission",
		sectionHeading: "Building your path to home",
		sectionSummary:
			"Cornerstone Residency Solutions is a community-focused organization based in Paducah, Kentucky, dedicated to assisting individuals and families in establishing residency.",
	},
	features: [
		{
			name: "Local resources",
			description:
				"Our team collaborates closely with local experts to provide tailored solutions that make residency a reality for our clients.",
			icon: "MapIcon",
		},
		{
			name: "Experienced and reliable",
			description:
				"With years of local investment experience, we handle the hard part for you by utilizing local resources and fostering meaningful relationships with specialists to streamline the residency process.",
			icon: "BuildingLibraryIcon",
		},
		{
			name: "Personalized support",
			description:
				"At Cornerstone Residency Solutions, we understand the importance of community connections and personalized support.",
			icon: "PuzzlePieceIcon",
		},
		{
			name: "Trusted partnership",
			description:
				"Whether you're seeking to establish residency or navigate the intricacies of relocation, trust Cornerstone Residency Solutions to be your trusted partner every step of the way.",
			icon: "UserGroupIcon",
		},
	],
};

const splitContent = {
	sectionTitle: "How It Works",
	sectionHeading: "How Our Rent-to-Own Program Works",
	sectionSummary:
		"At Cornerstone Residency Solutions, we make the journey to home ownership simple and accessible with our rent-to-own program. Here’s how it works:",
	imageURL:
		"https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?q=80&w=3043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	features: [
		{
			name: "Fill Out Your Preferences",
			description:
				"Tell us what kind of house you’re looking for. Whether it’s a cozy starter home or a spacious family house, we’ll help you find the perfect match.",
			icon: "MapIcon",
		},
		{
			name: "Determine Your Option Deposit",
			description:
				"Let us know what you can afford for an option deposit. This deposit secures your right to purchase the home in the future.",
			icon: "BuildingLibraryIcon",
		},
		{
			name: "Set Your Lease Duration",
			description:
				"Decide how long you need to lease the property before securing financing. Our flexible terms are designed to fit your unique situation.",
			icon: "PuzzlePieceIcon",
		},
		{
			name: "Background Check and Credit Building",
			description:
				"Complete a background check and take advantage of our strategies to help you build your credit, ensuring you're ready to buy when the time comes.",
			icon: "UserGroupIcon",
		},
	],
	// button: "Apply Now",
	// buttonLink: "/applications",
};

export default function Index() {
	return (
		<Home
			gridContent={gridContent || {}}
			splitContent={splitContent || {}}
		/>
	);
}
