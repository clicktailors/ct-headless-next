import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../styles/index.css";
import "@primer/react-brand/lib/css/main.css";
import DrawerNavbar from "../components/navbar/DaisyNavbar";
import Footer from "../components/sections/core/Footer";
import { SITE_NAME, SITE_DESCRIPTION } from "../lib/constants";
import ClientProviders from "../components/providers/ClientProviders";
import { Suspense } from "react";
import ThirdPartyScripts from "../components/core/ThirdPartyScripts";
import usePageTracking from "../hooks/usePageTracking";

const bricolage = Bricolage_Grotesque({
	weight: "variable",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	usePageTracking();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={bricolage.className}>
				<Suspense fallback={null}>
					<ClientProviders>
						<ThirdPartyScripts />
						<div className="min-h-screen flex flex-col justify-between">
							<DrawerNavbar
								pageContent={<main>{children}</main>}
							/>
						</div>
						<Footer />
					</ClientProviders>
				</Suspense>
			</body>
		</html>
	);
}
