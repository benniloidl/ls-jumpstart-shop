import type { Context } from "@netlify/functions";
import { getEntriesByContentType } from "../../lib/helpers";
import { changeProduct } from "./changeProduct";

export default async (req: Request, context: Context) => {
	const url = new URL(req.url);
	const slug = url.searchParams.get("slug");
	
	let pageEntries = await getEntriesByContentType("landingPage", slug);
	if (!pageEntries) return new Response("Error fetching entries", { status: 400 });
	
	pageEntries = await changeProducts(pageEntries);
	
	return new Response(JSON.stringify(pageEntries), {
		headers: {
			"content-type": "application/json",
		},
	});
}

// recursively change products that have been provided in sections by Contentful
async function changeProducts(data: any) {
	if (typeof data !== "object") return data;
	
	let _data = Array.isArray(data) ? [] : {};
	
	for (let key in data) {
		let value = data[key];
		
		if (key === "products") {
			let products = [];
			for (let product of value) {
				products.push(await changeProduct(product));
			}
			_data[key] = products;
		} else {
			_data[key] = await changeProducts(value);
		}
	}
	
	return _data;
}
