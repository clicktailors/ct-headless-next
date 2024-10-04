import React, { ReactNode } from "react";

interface SectionProps {
	children: ReactNode;
	className?: string;
	fullWidth?: boolean;
}

export default function Section({
	children,
	className = "",
	fullWidth = false,
}: SectionProps) {
	return (
		<section className={`w-full ${fullWidth ? "" : "px-6"} ${className}`}>
			{children}
		</section>
	);
}
