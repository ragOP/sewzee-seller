import { ADDMORETAGS, SEOTAG } from "../../../hooks/constant"
import "./SeoOptions.css"

const SeoOptions = ({ formState, dispatch }) => {


    const handleAddMore = () => {
        dispatch({
            type: ADDMORETAGS,
            payload: {

            }
        })
    }

    const handleChange = (e, index) => {
        dispatch({
            type: SEOTAG,
            payload: {
                index: index,
                value: e.target.value
            }
        })
    }


    return (
        <section className="seoOptionsWrapper">
            <div className="seoOptionsInputs">
                {formState?.seotags.map((item, index) =>
                    <div key={index} className={`seoOptionsInput ${index === 0 ? "" : "marginTop20"} `}>
                        <input required onChange={(e) => handleChange(e, index)} type="text" placeholder="Enter Single Tag" />
                        {index === formState.seotags.length - 1 && <span onClick={handleAddMore}>+ Add More</span>}
                    </div>)}
            </div>
        </section>
    )
}

export default SeoOptions