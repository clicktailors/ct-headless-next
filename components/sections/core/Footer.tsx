import React from "react";
import Container from "../../ui/container";
import { SITE_NAME, COMPANY_NAME, APPLY_LINK } from "../../../lib/constants";
import Link from "next/link";
import NavigationItems from "../../navbar/NavigationItems";
import { usePathname } from "next/navigation";
import Socials from "./Socials";
import Copyright from "../misc/Copyright";

interface SiteTitleProps {
	siteName: string;
}

const SiteTitle: React.FC<SiteTitleProps> = ({ siteName }) => (
	<Container>
		<div className="py-10 flex flex-col lg:flex-row items-center">
			<Link href="/">
				<h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
					{siteName}.
				</h3>
			</Link>
		</div>
	</Container>
);

const Links: React.FC = () => {
	const currentPath = usePathname();
	return (
		<nav className="grid grid-flow-col gap-4">
			<NavigationItems currentPath={currentPath ?? ""} footer={true} />
			<Link href={APPLY_LINK} className="link link-hover">
				Apply
			</Link>
		</nav>
	);
};

const Footer: React.FC = () => {
	return (
		<footer className="bg-accent-1 border-accent-2 footer footer-center p-10 bg-base-300 text-base-content rounded">
			<SiteTitle siteName={SITE_NAME} />
			<Links />
			<Socials />
			<Copyright />
			{/* <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">
                    Powered by <a href="https://nextjs.org">Next.js</a>
                </p>
            </div> */}
		</footer>
	);
};

export default Footer;
