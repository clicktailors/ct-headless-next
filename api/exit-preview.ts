import { NextApiResponse } from "next";

export default async function exit(_: any, res: NextApiResponse): Promise<void> {
	// Exit Draft Mode by removing the cookie
	res.setDraftMode({ enable: false });

	// Redirect the user back to the index page.
	res.writeHead(307, { Location: "/" });
	res.end();
}
