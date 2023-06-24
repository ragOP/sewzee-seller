import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';


import "./ProductsBasicInfo.css"


const QuillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
]
const QuillModules = {
    toolbar: [
        ["bold", "italic", "underline"],
        ["link"],
        [
            { list: "ordered" },
            { list: "bullet" },
        ],
        [{ color: [] }],
        [{ background: [] }],

    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};


const ProductsBasicInfo = () => {
    ProductsBasicInfo.modules = QuillModules;
    ProductsBasicInfo.formats = QuillFormats;
    const [value, setValue] = useState('');
    return (
        <div className="productsBasicInfoWrapper">
            <h6 className="productsBasicInfoTitle">Basic Info</h6>
            <div className="productBasicInfoInputs">
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Name</label>
                    <input className='width50' type="text" id="productName" placeholder='Enter Product Name' />
                </div>
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Description</label>
                    <div className='reactQuilllWrapper'>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={setValue}
                            placeholder="Add Product Description"
                            modules={ProductsBasicInfo.modules}
                            formats={ProductsBasicInfo.formats}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsBasicInfo