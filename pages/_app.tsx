import { AppProps } from "next/app";
import "@primer/react-brand/lib/css/main.css";
import "../styles/index.css";
import { ThemeProvider as NextThemesProvider } from "../utils/ThemeProvider";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";
import ThirdPartyScripts from "../components/core/ThirdPartyScripts";
import PageTracker from "../components/core/PageTracker";

function MyApp({ Component, pageProps }: AppProps) {
	const providerProps = {
		attribute: "data-theme",
		defaultTheme: "system",
		themes: ["light", "dark"],
		colorMode: "dark",
	};

	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				<ThirdPartyScripts />
				<PageTracker />
				<Component {...pageProps} />
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}

export default MyApp;
