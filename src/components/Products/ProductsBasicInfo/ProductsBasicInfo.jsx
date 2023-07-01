import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';


import "./ProductsBasicInfo.css"
import { BASICDETAILS } from '../../../hooks/constant';


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


const ProductsBasicInfo = ({ formState, dispatch }) => {
    ProductsBasicInfo.modules = QuillModules;
    ProductsBasicInfo.formats = QuillFormats;
    const [value, setValue] = useState('');

    const handleChnage = (e) => {
        dispatch({
            type: BASICDETAILS,
            payload: e.target
        })
    }
    const handleDescription = (e) => {
        dispatch({
            type: BASICDETAILS,
            payload: {
                name: 'description',
                value: e
            }
        })
        setValue(e)
    }

    return (
        <div className="productsBasicInfoWrapper">
            <h6 className="productsBasicInfoTitle">Basic Info</h6>
            <div className="productBasicInfoInputs">
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Name</label>
                    <input onChange={handleChnage} required className='width50' type="text" id="productName" placeholder='Enter Product Name' name="name" defaultValue={formState?.name} />
                </div>
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Description</label>
                    <div className='reactQuilllWrapper'>
                        <ReactQuill
                            theme="snow"
                            value={formState?.description || value}
                            required
                            onChange={handleDescription}
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