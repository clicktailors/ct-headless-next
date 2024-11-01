"use client";

import React, { useEffect, useState } from "react";
import { CTA_LINK, CTA_TEXT } from "../../../lib/constants";
import Link from "next/link";
import NavigationItems from "../../navbar/NavigationItems";
import { usePathname } from "next/navigation";
import Socials from "../../ui/Socials";
import Copyright from "../misc/Copyright";
import SiteTitle from "../../ui/SiteTitle";

const Links: React.FC = () => {
	const [mounted, setMounted] = useState(false);
	const currentPath = usePathname();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<nav className="grid grid-flow-col gap-4">
			<NavigationItems currentPath={currentPath ?? ""} footer={true} />
			<Link href={CTA_LINK} className="link link-hover">
				{CTA_TEXT}
			</Link>
		</nav>
	);
};

const Footer: React.FC = () => {
	return (
		<footer className="border-accent-2 footer footer-center p-16 bg-black/5 text-base-content rounded">
			<SiteTitle size="text-4xl" logoSize="size-8" />
			<Links />
			<Socials />
			<div className="flex flex-col items-center text-gray-500">
				<Copyright />
			</div>
		</footer>
	);
};

export default Footer;
