import Link from "next/link";
import { FACEBOOK, TWITTER, MEDIUM, INSTAGRAM } from "../../../lib/constants";
import { styles } from "../../../lib/styles";
import {
	XIcon,
	FacebookIcon,
	MediumIcon,
	InstagramIcon,
} from "../../images/tsx/icons";

const Socials = () => {
	const socialClasses = styles.icon;
	const socialLinks = [
		{ href: INSTAGRAM, icon: <InstagramIcon />, name: "INSTAGRAM" },
		{ href: TWITTER, icon: <XIcon />, name: "TWITTER" },
		{ href: MEDIUM, icon: <MediumIcon />, name: "MEDIUM" },
		{ href: FACEBOOK, icon: <FacebookIcon />, name: "FACEBOOK" },
	];

	const socials = socialLinks.filter((social) => social.href);

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
