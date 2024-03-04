export async function changeProduct(product: any) {
	if (!product.fields.sapCommerceReference) return {};
	
	let sapCommerceReference = product.fields.sapCommerceReference;
	if (sapCommerceReference.type === "category") {
		let data = await fetch(sapCommerceReference.data)
			.then(response => response.json());
		
		// get title of category from url
		let name = data.currentQuery.url.split('/');
		name.pop();
		name.pop();
		let title = name.pop();
		
		return {
			...product,
			fields: {
				...product.fields,
				...{
					title,
					sapCommerceProducts: data.products
				}
			}
		}
	} else if (sapCommerceReference.type !== "product") return {};
	
	let data = await fetch(sapCommerceReference.data + "?fields=DEFAULT,images(FULL)")
		.then(response => response.json());
	
	let title = data.manufacturer + " :: " + data.name;
	let price = data.price.value.toFixed(2); // Todo: currency?
	
	const _image = data.images.find(
		(image: any) => image.imageType === 'PRIMARY' && image.format === 'product'
	);
	let image = {
		fields: {
			title: _image.altText,
			file: {
				url: sapCommerceReference.data.split("/occ")[0] + _image.url
			}
		}
	};
	
	return {
		...product,
		fields: {
			...product.fields,
			...{
				title,
				price,
				image,
				description: {
					data: {},
					content: parseDescription(data.description),
					nodeType: "paragraph"
				}
			}
		}
	}
}

// recursively parse description
function parseDescription(description: string) {
	let content = [];
	
	let isBold = false;
	let isItalic = false;
	let isUnderline = false;
	let isStrikeThrough = false;
	let isTag = false;
	
	// iterate over splits
	const splits = description.split(/<|>/);
	for (let i = 0; i < splits.length; i++) {
		let split = splits[i];
		
		if (split === "b") {
			isBold = !isBold;
			continue;
		}
		if (split === "i") {
			isItalic = !isItalic;
			continue;
		}
		if (split === "u") {
			isUnderline = !isUnderline;
			continue;
		}
		if (split === "s") {
			isStrikeThrough = !isStrikeThrough;
			continue;
		}
		if (split === "tag") {
			isTag = !isTag;
			continue;
		}
		
		let node = {
			data: {},
			marks: [],
			value: split,
			nodeType: "text"
		};
		
		if (isBold) node.marks.push("bold");
		if (isItalic) node.marks.push("italic");
		if (isUnderline) node.marks.push("underline");
		if (isStrikeThrough) node.marks.push("strikeThrough");
		if (isTag) node.marks.push("tag");
		
		content.push(node);
	}
	
	return content;
}
