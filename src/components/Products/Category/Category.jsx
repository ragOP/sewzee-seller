import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { CircularProgress } from '@mui/material';

import "./Category.css"
import API from "../../../services/common"
import { CustomButton } from "../../../ui/constants"
import { ADDTYPECATEGORYCOLLECTION } from "../../../hooks/constant"



const Category = ({ formState, dispatch }) => {
    const [category, setCategory] = useState("")
    const [isLoading, setLsloading] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])


    const loadCategory = async () => {
        try {
            const res = await API.get("/api/seller/list");
            setCategoryList(res?.data?.category)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        loadCategory()
    }, [])

    const handleCategory = (e) => {
        dispatch({
            type: ADDTYPECATEGORYCOLLECTION,
            payload: {
                name: "category",
                value: e.target.value
            }
        })
    }

    const handleCreateCategory = async (e) => {
        e.preventDefault()
        if (!newCategory) return toast.error("Please enter category name")
        setLsloading(true)
        try {
            const res = await API.post("/api/seller/category", { name: newCategory });
            if (res.status === 200) {
                toast.success("Category added successfully");
                loadCategory()
                setLsloading(false)
                setCategory("Choose")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setLsloading(false)
        }
    }

    return (
        <section className="categoryWrapper">
            <div className="categoryContainer">
                <div onClick={() => setCategory("Choose")} className={`categoryOptions marginRight20 ${category === "Choose" && "categoryActive"}`}>
                    <p>Choose Categores</p>
                </div>
                <div onClick={() => setCategory("Create")} className={`categoryOptions marginRight20 ${category === "Create" && "categoryActive"}`}>
                    <p>Create Categores</p>
                </div>
            </div>
            {category === "Choose" &&
                <div className="chooseCategory">
                    <div className="chooseCategoryBox">
                        <label>Select Category</label>
                        <div className="chooseCategoryInput">
                            <select required onChange={handleCategory} value={formState?.category}>
                                <option>Select Category</option>
                                {categoryList?.map((item, index) =>
                                    <option value={item?.id} key={index}>{item?.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            }
            {category === "Create" &&
                <div className="createCategory">
                    <div className="createCategoryBox">
                        <label>Category Name</label>
                        <div className="createCategoryInput">
                            <input onChange={(e) => setNewCategory(e.target.value)} type="text" placeholder="Enter Category Name" />
                        </div>
                    </div>
                    <CustomButton handleClick={handleCreateCategory} classId={`createCategoryBtn pointer`}>{isLoading ? <CircularProgress sx={{ color: "white" }}
                        size={20} /> : "Add New Category"}</CustomButton>
                </div>
            }
        </section>
    )
}

export default Category