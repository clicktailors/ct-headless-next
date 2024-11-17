"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
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
		enableSystem: true,
		value: {
			light: "light",
			dark: "dark",
			system: "system",
		},
	};

	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={
					providerProps.defaultTheme as "light" | "dark" | "auto"
				}
			>
				{children}
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}
