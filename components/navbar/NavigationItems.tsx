import Link from "next/link";
import React, { useCallback } from "react";
import routes from "../../lib/routes";
import { useRouter } from "next/router";

interface NavItem {
	route: {
		name: string;
		path: string;
	};
	drawer?: boolean;
	currentPath: string;
	footer: boolean;
	closeMenu: () => void;
}

interface NavigationItemsProps {
	currentPath: string;
	footer?: boolean;
	closeMenu?: () => void;
	drawer?: boolean;
}

const NavItem = React.memo(
	({ route, currentPath, footer, closeMenu, drawer }: NavItem) => {
		const { path, name } = route;
		const router = useRouter();
		const linkClass = `
			${drawer && "text-lg w-full justify-start btn-md"}
			${!footer && "btn btn-sm btn-ghost"}
			${footer && "link link-hover"} 
			${currentPath === path && "text-primary"}
		`.trim();

		const handleClick = (e: React.MouseEvent) => {
			e.preventDefault();
			router.push(path).then(() => {
				if (closeMenu) closeMenu();
			});
		};

		return (
			<Link href={path} onClick={handleClick} className={linkClass}>
				{name}
			</Link>
		);
	}
);

const NavigationItems: React.FC<NavigationItemsProps> = ({
	currentPath,
	footer = false,
	drawer = false,
	closeMenu,
}) => {
	const handleMenuClose = useCallback(() => {
		if (closeMenu) closeMenu();
	}, [closeMenu]);

	return (
		<>
			{routes.map((route) => (
				<NavItem
					key={route.path}
					drawer={drawer}
					route={route}
					currentPath={currentPath}
					footer={footer}
					closeMenu={handleMenuClose}
				/>
			))}
		</>
	);
};

export default NavigationItems;
