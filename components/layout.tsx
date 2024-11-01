import Footer from "./sections/core/Footer";
import Meta from "./sections/core/Meta";
import DrawerNavbar from "./navbar/DaisyNavbar";
import Script from "next/script";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
	weight: "variable",
	subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
	// add font bricolage grotesque

	return (
		<>
			<Meta />
			<div className="min-h-screen flex flex-col justify-between">
				<DrawerNavbar
					pageContent={
						<main className={bricolage.className}>{children}</main>
					}
				/>
			</div>
			<Footer />
		</>
	);
}
