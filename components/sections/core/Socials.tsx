import Link from "next/link";
import { FACEBOOK, YOUTUBE, TWITTER } from "../../../lib/constants";
import { styles } from "../../../lib/styles";
import { TwitterIcon, YouTubeIcon, FacebookIcon } from "../../images/tsx/icons";

const Socials = () => {
	const socialClasses = styles.icon;

	const socials = [
		{ href: TWITTER, icon: <TwitterIcon /> },
		{ href: YOUTUBE, icon: <YouTubeIcon /> },
		{ href: FACEBOOK, icon: <FacebookIcon /> },
	];

	return (
		<nav>
			<div className="grid grid-flow-col gap-4 justify-center">
				{socials.map((social, index) => (
					<SocialLink
						href={social.href}
						icon={social.icon}
						className={socialClasses}
						key={index}
					/>
				))}
			</div>
		</nav>
	);
};

const SocialLink = ({
	href,
	icon,
	className,
}: {
	href: string;
	icon: React.ReactNode;
	className?: string;
}) => {
	return (
		<Link className={`${className}`} href={href}>
			{icon}
		</Link>
	);
};

export default Socials;
