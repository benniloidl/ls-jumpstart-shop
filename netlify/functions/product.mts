import type { Context } from "@netlify/functions";
import { getEntriesByContentType } from "../../lib/helpers";
import { changeProduct } from "./changeProduct";

export default async (req: Request, context: Context) => {
	const url = new URL(req.url);
	const slug = url.searchParams.get("slug");
	
	let pageEntries = await getEntriesByContentType("product", slug);
	if (!pageEntries) return new Response("Error fetching entries", { status: 400 });
	
	let _pageEntries = [];
	for (let pageEntry of pageEntries.items) {
		_pageEntries.push(await changeProduct(pageEntry));
	}
	pageEntries.items = _pageEntries;
	
	return new Response(JSON.stringify(pageEntries), {
		headers: {
			"content-type": "application/json",
		},
	});
}
