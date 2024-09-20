import { AppProps } from "next/app";
import "../styles/index.css";
import { ThemeProvider as NextThemesProvider } from '../utils/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const providerProps = {
    attribute: "data-theme",
    // Add any other props you need here
  };

  return (
    <NextThemesProvider {...providerProps}>
      <Component {...pageProps} />
    </NextThemesProvider>
  );
}

export default MyApp;