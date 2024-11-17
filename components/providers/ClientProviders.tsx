"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const providerProps = {
		attribute: "data-theme",
		defaultTheme: "system",
		themes: ["light", "dark"],
		colorMode: "dark",
	};

	return (
		<ThemeProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				{children}
			</PrimerThemeProvider>
		</ThemeProvider>
	);
}
