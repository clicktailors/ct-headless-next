import { AppProps } from "next/app";
import "@primer/react-brand/lib/css/main.css";
import "../styles/index.css";
import { ThemeProvider as NextThemesProvider } from "../utils/ThemeProvider";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as pixel from "../lib/fpixel";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
	const providerProps = {
		attribute: "data-theme",
		defaultTheme: "system",
		themes: ["light", "dark"],
		colorMode: "dark",
	};

	const router = useRouter();

	useEffect(() => {
		// This pageview only triggers the first time (it's important for Pixel to have real information)
		pixel.pageview();

		const handleRouteChange = () => {
			pixel.pageview();
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	const FbScript = () => (
		<Script
			id="fb-pixel"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${pixel.FB_PIXEL_ID});
          `,
			}}
		/>
	);

	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				<Component {...pageProps} />
				<GoogleAnalytics gaId="G-M1L6SCV1TL" />
				<FbScript />
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}

export default MyApp;
