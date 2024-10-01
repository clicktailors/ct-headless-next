import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

interface SiteLogoProps {
	className?: string;
	size?: "size-6" | "size-8" | "size-10" | "size-12";
}

export const SiteLogo = ({
	className = "",
	size = "size-6",
}: SiteLogoProps) => {
	return (
		<div className={`flex items-center ${className}`}>
			<CursorArrowRaysIcon className={`${size} text-gradient-start`} />
		</div>
	);
};
