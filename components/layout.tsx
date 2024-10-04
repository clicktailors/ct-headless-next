import Footer from "./sections/core/Footer";
import Meta from "./sections/core/Meta";
import DrawerNavbar from "./navbar/DaisyNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Meta />
			<div className="min-h-screen flex flex-col justify-between">
				<DrawerNavbar pageContent={<main>{children}</main>} />
			</div>
			<Footer />
		</>
	);
}
