import { AppProps } from "next/app";
import "@primer/react-brand/lib/css/main.css";
import "../styles/index.css";
import { ThemeProvider as NextThemesProvider } from "../utils/ThemeProvider";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";
import { GoogleAnalytics } from "@next/third-parties/google";

function MyApp({ Component, pageProps }: AppProps) {
	const providerProps = {
		attribute: "data-theme",
		defaultTheme: "system",
		themes: ["light", "dark"],
		colorMode: "dark",
	};

	const GOOGLE_ANALYTICS_ID = process.env
		.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				<Component {...pageProps} />
				<GoogleAnalytics gaId={"G-M1L6SCV1TL" || ""} />
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}

export default MyApp;
