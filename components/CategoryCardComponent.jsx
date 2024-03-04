import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import richtextRenderOptions from "../lib/richtextRenderOptions";
import ImageComponent from "./ImageComponent";

const ProductCardComponent = (props) => {
    const router = useRouter();
    const id = _.get(props, "id");
    const productIndex = _.get(props, "productIndex");
    const fields = _.get(props, "fields");
    
    const [indexIsOdd, setIndexIsOdd] = useState(false);
    
    useEffect(() => {
        if (!productIndex % 2 == 0) {
            setIndexIsOdd(true);
        }
        return () => {
        };
    }, []);
    
    // console.log("description field", fields.description);
    
    if (!fields) return "";
    
    console.log(fields.sapCommerceProducts);
    
    return (
        <div className="">
            <div
                className="flex flex-col space-y-10x lg:space-y-0x lg:space-x-10x lg:flex-row w-full p-6x lg:py-10x lg:px-40x overflow-hidden rounded-md shadow-lg">
                <div className={ `flex flex-col w-1/2 bg-gelb p-10 ${
                    indexIsOdd ? "" : "order-last"
                }` }
                     style={ { gap: "1.25rem" } }>
                    { fields.sapCommerceProducts.map((product, productIndex) => {
                        return <div style={ {
                            display: "flex",
                            flexDirection: "row",
                            gap: "2.5rem",
                            borderTop: productIndex !== 0 ? "1px solid black" : "none",
                            paddingTop: productIndex !== 0 ? "1.25rem" : 0,
                        } }
                                    key={ _.get(product, "sys.id") }>
                            <div style={ { width: "100px", height: "100px" } }>
                                <ImageComponent image={ {
                                    fields: {
                                        title: "product image alt text", // Todo: get alt text from contentful
                                        file: {
                                            url: fields.sapCommerceReference.data.split("/occ")[0] + _.get(product, "firstVariantImage")
                                        }
                                    }
                                } }/>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold ">{ _.get(product, "manufacturer") + " :: " + _.get(product, "name") }</h2>
                                <p className={ "mt-2 mb-2" }>{ _.get(product, "summary") }</p>
                                <p className={ "text-xl" }>{ _.get(product, "price.formattedValue") }</p>
                            </div>
                        </div>;
                    }) }
                
                </div>
                <div className="w-1/2 bg-blau9x bg-blau3 p-10 grid place-items-center">
                    <h2 className="text-3xl font-bold text-white">{ fields.title }</h2>
                </div>
            </div>
            {/* {JSON.stringify(fields)} */ }
        </div>
    );
};

export default ProductCardComponent;
