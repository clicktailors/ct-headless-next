"use client";

import { ThemeProvider as NextThemesProvider } from "../../utils/ThemeProvider";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";
import { GoogleAnalytics } from "@next/third-parties/google";
import FacebookPixel from "../integrations/FacebookPixel";

const providerProps = {
	attribute: "data-theme",
	defaultTheme: "system",
	themes: ["light", "dark"],
	colorMode: "dark",
};

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				{children}
				<GoogleAnalytics gaId="G-M1L6SCV1TL" />
				<FacebookPixel />
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}
