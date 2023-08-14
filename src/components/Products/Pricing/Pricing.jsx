import Switch from "@mui/material/Switch";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import "./Pricing.css";
import { PRICING } from "../../../hooks/constant";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Pricing = ({ formState, dispatch }) => {
    const handleChange = (e) => {
        console.log(e.target.value);
        dispatch({
            type: PRICING,
            payload: e.target,
        });
    };

    const handleDiscountType = (data) => {
        dispatch({
            type: PRICING,
            payload: {
                name: "discount_type",
                value: data,
            },
        });
    };

    console.log(formState);
    return (
        <section className="pricingWrapper">
            <div className="pricingInputs flexJustifyStart flexColumn">
                <div className="pricingInputBox">
                    <label>Price</label>
                    <div className="pricingInput">
                        <span>₹</span>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            defaultValue={formState?.price}
                            placeholder="Enter Price"
                            name="price"
                        />
                    </div>
                </div>
                <div className="pricingInputs marginBottom0 marginTop20">
                    <div className="onSaleCheckbox">
                        <Switch
                            disabled={
                                formState?.price === null
                                    ? true
                                    : formState?.price === ""
                                    ? true
                                    : formState?.price === 0
                                    ? true
                                    : false
                            }
                            onChange={handleChange}
                            {...label}
                            name="onsale"
                            defaultChecked={formState?.onsale}
                        />
                        <label className="onSaleInfoIcon">
                            On Sale{" "}
                            <Tooltip
                                className="flex"
                                title="Please Enter Price First"
                                placement="right"
                            >
                                {" "}
                                <InfoIcon />
                            </Tooltip>{" "}
                        </label>
                    </div>
                </div>
            </div>
            {formState?.onsale === 1 && (
                <div className="pricingInputs">
                    <div className="pricingInputBox">
                        <label>Discount</label>
                        <div className="pricingInput paddingEnd0">
                            <input
                                style={{ width: "140px" }}
                                className="paddingSt0"
                                onChange={handleChange}
                                type="number"
                                min={0}
                                max={
                                    formState?.discount_type === "percentage"
                                        ? 99
                                        : formState?.price - 1
                                }
                                name="discount"
                                required
                                value={formState?.discount}
                                placeholder="Enter Discount"
                                onInput={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (
                                        value >
                                        (formState?.discount_type ===
                                        "percentage"
                                            ? 99
                                            : formState?.price)
                                    ) {
                                        e.target.value =
                                            formState?.discount_type ===
                                            "percentage"
                                                ? 99
                                                : formState?.price - 1;
                                    }
                                }}
                            />
                            <div className="discountIcon">
                                <span
                                    onClick={() =>
                                        handleDiscountType("percentage")
                                    }
                                    className={`${
                                        formState?.discount_type ===
                                            "percentage" && "discountIconActive"
                                    }`}
                                >
                                    %
                                </span>
                                <span
                                    onClick={() => handleDiscountType("amount")}
                                    className={`${
                                        formState?.discount_type === "amount" &&
                                        "discountIconActive"
                                    }`}
                                >
                                    ₹
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="pricingInputBox">
                        <label>Sale Price</label>
                        <div className="pricingInput">
                            <span>₹</span>
                            <input
                                disabled
                                type="text"
                                required
                                placeholder="Enter Price"
                                name="price"
                                value={formState?.salesprice}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="pricingInputs flexColumn width50 gap0">
                <label>Stock</label>
                <div>
                    <div className="pricingInputBox">
                        <div className="onSaleCheckbox">
                            <Switch
                                onChange={handleChange}
                                {...label}
                                required
                                name="instock"
                                defaultChecked={formState?.instock}
                            />{" "}
                            <label>In stock</label>
                            {/* <Switch onChange={handleChange} {...label} required name='onsale' defaultChecked={formState?.onsale} /> <label>On Sale</label> */}
                        </div>
                    </div>
                    {formState?.instock === 1 && (
                        <div
                            className="pricingInputBox"
                            style={{ width: "40%" }}
                        >
                            <label>Total Stock</label>
                            <div className="pricingInput paddingSt0">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="totalstock"
                                    required
                                    value={formState?.totalstock}
                                    placeholder="Enter Total Stock"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
