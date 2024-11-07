import { Html, Head, Main, NextScript } from "next/document";
import Integrations from "../components/integrations/integrations";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Integrations />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
