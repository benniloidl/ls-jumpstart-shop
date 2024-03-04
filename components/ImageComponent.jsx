import _ from "lodash";
import Image from "next/image";

const ImageComponent = (props) => {
    const id = _.get(props, "id");
    const image = _.get(props, "image");
    const imgUrl = _.get(image, "fields.file.url");
    const imgAltText = _.get(image, "fields.title");
    
    if (!image) {
        return "";
    }
    return (
        <>
            <div className="w-[400px]x max-w-[400px] m-auto overflow-hidden bg-white">
                <Image
                    src={ imgUrl }
                    width={ 1920 }
                    height={ 1080 }
                    objectFit={ "contain" }
                    layout="responsive"
                    alt={ imgAltText }
                />
            </div>
            
            <div className="">{/* <img className="" src={imgUrl} alt={""} /> */ }</div>
        </>
    );
};

export default ImageComponent;
