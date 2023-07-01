import Switch from '@mui/material/Switch';

import "./Pricing.css"
import { PRICING } from '../../../hooks/constant';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Pricing = ({ formState, dispatch }) => {

    const handleChange = (e) => {

        dispatch({
            type: PRICING,
            payload: e.target
        })
    }

    return (
        <section className="pricingWrapper">
            <div className="pricingInputs flexJustifyStart flexColumn">
                <div className="pricingInputBox">
                    <label>Price</label>
                    <div className="pricingInput">
                        <span>₹</span>
                        <input onChange={handleChange} type="text" required placeholder="Enter Price" name="price" />
                    </div>
                </div>
                <div className="pricingInputs marginBottom0 marginTop20">
                    <div className="onSaleCheckbox">
                        <Switch onChange={handleChange} {...label} required name='onsale' defaultChecked={formState?.onsale} /> <label>On Sale</label>
                    </div>
                </div>
            </div>
            <div className="pricingInputs">
                <div className="pricingInputBox">
                    <label>Discount Price</label>
                    <div className="pricingInput">
                        <span>₹</span>
                        <input onChange={handleChange} type="text" name="discount" required placeholder="Enter Discount Price" />
                    </div>
                </div>
                <div className="pricingInputBox">
                    <label>Total Stock</label>
                    <div className="pricingInput paddingSt0">
                        <input onChange={handleChange} type="text" name="totalstock" required placeholder="Enter Total Stock" />
                    </div>
                </div>
                <div className="pricingInputBox">
                    <div className="onSaleCheckbox">
                        <Switch onChange={handleChange} {...label} required name='instock' defaultChecked={formState?.instock} /> <label>In stock</label>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Pricing