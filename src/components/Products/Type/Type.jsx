import { useState } from "react"
import { ADDTYPECATEGORYCOLLECTION } from "../../../hooks/constant"


const Type = ({ formState, dispatch }) => {
    const handleType = (value) => {

        dispatch({
            type: ADDTYPECATEGORYCOLLECTION,
            payload: {
                name: "type",
                value: value
            }
        })
    }
    return (
        <section>
            <div className="categoryContainer">
                <div onClick={() => handleType("Men")} className={`categoryOptions marginRight20 ${formState?.type === "Men" && "categoryActive"}`}>
                    <p>Men</p>
                </div>
                <div onClick={() => handleType("Women")} className={`categoryOptions marginRight20 ${formState?.type === "Women" && "categoryActive"}`}>
                    <p>Women</p>
                </div>
                <div onClick={() => handleType("Kids")} className={`categoryOptions marginRight20 ${formState?.type === "Kids" && "categoryActive"}`}>
                    <p>Kids</p>
                </div>
                <div onClick={() => handleType("Other")} className={`categoryOptions marginRight20 ${formState?.type === "Other" && "categoryActive"}`}>
                    <p>Other</p>
                </div>
            </div>
        </section>
    )
}

export default Type