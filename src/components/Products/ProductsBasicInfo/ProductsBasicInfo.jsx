import "react-quill/dist/quill.snow.css";

import "./ProductsBasicInfo.css";
import { BASICDETAILS } from "../../../hooks/constant";

const ProductsBasicInfo = ({ formState, dispatch }) => {
    const handleChnage = (e) => {
        dispatch({
            type: BASICDETAILS,
            payload: e.target,
        });
    };

    return (
        <div className="productsBasicInfoWrapper">
            <h6 className="productsBasicInfoTitle">Basic Info</h6>
            <div className="productBasicInfoInputs">
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        onChange={handleChnage}
                        required
                        className="width50"
                        type="text"
                        id="productName"
                        placeholder="Enter Product Name"
                        name="name"
                        defaultValue={formState?.name}
                    />
                </div>
                <div className="productBasicInfoInput">
                    <label htmlFor="productName">Product Description</label>
                    <textarea
                        className=""
                        onChange={handleChnage}
                        type="text"
                        defaultValue={formState?.description}
                        name="description"
                        id="description"
                        placeholder={`Enter Product Description`}
                        required
                        rows="7"
                        cols="33"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsBasicInfo;
