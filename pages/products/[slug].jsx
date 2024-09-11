import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import Head from "next/head";
import ImageComponent from "../../components/ImageComponent";
import { getEntriesByContentType } from "../../lib/helpers";
import richtextRenderOptions from "../../lib/richtextRenderOptions";

const ProductPage = (props) => {
    console.log("static props", props);
    const product = _.get(props, "product.items[0]");
    const contentType = _.get(product, "sys.contentType.sys.id");
    const productId = _.get(product, "sys.id");
    const fields = _.get(product, "fields");
    const title = _.get(product, "fields.title");
    return (
        <>
            <Head>
                <title>{ title }</title>
            </Head>
            <div className="p-20 flex flex-col space-y-4 h-screen items-center">
                <div className="w-full rounded shadow-xl">
                    <ImageComponent image={ fields.image }/>
                </div>
                <h1 className="text-3xl mb-4 font-bold">{ title }</h1>
                <p className=" text-xl text-blau">${ fields.price }</p>
                <div className="">
                    { documentToReactComponents(fields.description, richtextRenderOptions) }
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    // const productEntries = await getEntriesByContentType("product");
    
    // fetch productEntries from serverless function
    const productEntries = await fetch(process.env['HOST'] + "/.netlify/functions/product")
        .then(res => res.json());
    
    let paths = [];
    if (productEntries) {
        try {
            productEntries.items.forEach((entry) => {
                const slugVal = _.get(entry, "fields.slug");
                if (slugVal) paths.push({ params: { slug: slugVal } });
            });
        } catch (error) {
        }
    }
    
    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const slug = _.get(context, "params.slug");
    // const product = await getEntriesByContentType("product", slug);
    
    // fetch product from serverless function
    const url = process.env['HOST'] + "/.netlify/functions/product?slug=" + slug;
    const product = await fetch(url).then(res => res.json());
    
    return {
        props: { product },
    };
}

export default ProductPage;
