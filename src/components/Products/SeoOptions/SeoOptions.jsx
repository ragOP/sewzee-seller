import CloseIcon from "@mui/icons-material/Close";

import { ADDMORETAGS, REMOVESEOTAG, SEOTAG } from "../../../hooks/constant";
import "./SeoOptions.css";

const SeoOptions = ({ formState, dispatch }) => {
    const handleAddMore = () => {
        dispatch({
            type: ADDMORETAGS,
            payload: {},
        });
    };

    const handleChange = (e, index) => {
        dispatch({
            type: SEOTAG,
            payload: {
                index: index,
                value: e.target.value,
            },
        });
    };

    const handleRemove = (index) => {
        dispatch({
            type: REMOVESEOTAG,
            payload: index,
        });
    };

    return (
        <section className="seoOptionsWrapper">
            <div className="seoOptionsInputs">
                {formState?.seotags.map((item, index) => (
                    <div
                        key={index}
                        className={`seoOptionsInput flexAlignCenter ${
                            index === 0 ? "" : "marginTop20"
                        } `}
                    >
                        <input
                            value={item}
                            required
                            onChange={(e) => handleChange(e, index)}
                            type="text"
                            placeholder="Enter Single Tag"
                        />
                        {formState.seotags.length > 1 &&
                            index !== formState.seotags.length - 1 && (
                                <CloseIcon
                                    onClick={() => handleRemove(index)}
                                    className="closeIcon"
                                />
                            )}
                        {index === formState.seotags.length - 1 && (
                            <span onClick={handleAddMore}>+ Add More</span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SeoOptions;
