import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import "./Category.css";
import API from "../../../services/common";
import { CustomButton } from "../../../ui/constants";
import { ADDTYPECATEGORYCOLLECTION } from "../../../hooks/constant";

const Category = ({ formState, dispatch, type }) => {
    const [category, setCategory] = useState(type === "edit" ? "Choose" : "");
    const [isLoading, setLsloading] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [newCategory, setNewCategory] = useState({
        type: "",
        category: "",
    });
    const [defaultValue, setDefaultValue] = useState({});
    const [categoryChooseStep, setCategoryChooseStep] = useState({
        type: type === "edit" ? formState?.type : "",
        category: [],
    });
    const [categoryList, setCategoryList] = useState([]);

    // load category list
    const loadCategory = async () => {
        try {
            const res = await API.get("/api/seller/category");
            setCategoryList(res?.data?.category);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    // load category list
    useEffect(() => {
        loadCategory();
    }, []);

    // set category type in form state
    const handlecategoryChooseStep = (e) => {
        setCategoryChooseStep({
            ...categoryChooseStep,
            type: e.target.value,
        });

        const filteredCategory = categoryList[0]
            ?.filter((category) => category.type === e.target.value)
            .map((category) => {
                return {
                    value: category.id,
                    label: category?.category,
                };
            });

        const sortedCategory = filteredCategory.sort((a, b) =>
            a?.label?.localeCompare(b.label)
        );

        const updatedOptions = [
            ...sortedCategory,
            { value: "Create New Category", label: "Create New Category" },
        ];
        setAllCategory(updatedOptions);
        setCategoryChooseStep({
            ...categoryChooseStep,
            category: updatedOptions,
            type: e.target.value,
        });
    };

    // set new category value in form state
    const handleNewCategory = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };

    // set category value in form state
    const handleCategory = (e, value) => {
        if (value?.label === "Create New Category")
            return setCategory("Create");

        dispatch({
            type: ADDTYPECATEGORYCOLLECTION,
            payload: {
                name: "category",
                value: value?.value,
            },
        });
    };

    // create new category
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategory) return toast.error("Please enter category name");
        setLsloading(true);
        try {
            const res = await API.post("/api/seller/category", newCategory);
            if (res.status === 200) {
                toast.success("Category added successfully");
                loadCategory();
                setLsloading(false);
                setCategory("Choose");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setLsloading(false);
        }
    };

    // search category
    const handleSearchChange = (event, value) => {
        const filteredOptions = categoryChooseStep.category.filter((option) => {
            const isMatchedSearch = option.label
                .toLowerCase()
                .includes(value.toLowerCase());
            return isMatchedSearch;
        });

        setCategoryChooseStep((prevCategoryChooseStep) => ({
            ...prevCategoryChooseStep,
            category: value.length > 0 ? filteredOptions : allCategory,
        }));
    };

    // add create new category option on filter array
    const filterOptions = (options) => {
        const hasCreateNewCategory = options.some((option) =>
            option.label.includes("Create New Category")
        );
        if (!hasCreateNewCategory) {
            return [
                ...options,
                { value: "Create New Category", label: "Create New Category" },
            ];
        }
        return options;
    };

    useEffect(() => {
        if (type === "edit") {
            setCategoryChooseStep({
                ...categoryChooseStep,
                type: formState?.type,
            });
            if (formState?.type) {
                const filteredCategory = categoryList[0]
                    ?.filter((category) => category.type === formState?.type)
                    .map((category) => {
                        return {
                            value: category.id,
                            label: category?.category,
                        };
                    });
                const findCategory = filteredCategory?.find(
                    (item) => item.value === formState?.category
                );
                setDefaultValue(findCategory);

                const sortedCategory = filteredCategory?.sort((a, b) =>
                    a?.label?.localeCompare(b.label)
                );

                const updatedOptions = [
                    ...sortedCategory,
                    {
                        value: "Create New Category",
                        label: "Create New Category",
                    },
                ];
                setAllCategory(updatedOptions);
                setCategoryChooseStep({
                    ...categoryChooseStep,
                    category: updatedOptions,
                    type: formState?.type,
                });
            }
        }
    }, [formState?.type]);

    return (
        <section className="categoryWrapper">
            <div className="categoryContainer">
                <div
                    onClick={() => setCategory("Choose")}
                    className={`categoryOptions marginRight20 ${
                        category === "Choose" && "categoryActive"
                    }`}
                >
                    <p>Choose Categories</p>
                </div>
                <div
                    onClick={() => {
                        setCategory("Create");
                        setCategoryChooseStep({
                            ...categoryChooseStep,
                            type: "",
                            category: [],
                        });
                    }}
                    className={`categoryOptions marginRight20 ${
                        category === "Create" && "categoryActive"
                    }`}
                >
                    <p>Create Categories</p>
                </div>
            </div>
            {category === "Choose" && (
                <div className="chooseCategory">
                    <div className="chooseCategoryBox">
                        <label>Select Type:- Step 1 of 2</label>
                        <div className="chooseCategoryInput">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Select Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Type"
                                    value={categoryChooseStep?.type || ""}
                                    onChange={handlecategoryChooseStep}
                                >
                                    {Array.from(
                                        new Set(
                                            categoryList[0]?.map(
                                                (category) => category.type
                                            )
                                        )
                                    )?.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {categoryChooseStep?.type && (
                        <div className="chooseCategoryBox">
                            <label className="categoryInfoIcon">
                                Select Category:- Step 2 of 2{" "}
                                <Tooltip
                                    className="flex"
                                    title="If you don't find your right category, please create a new one."
                                    placement="right"
                                >
                                    {" "}
                                    <InfoIcon />
                                </Tooltip>
                            </label>
                            <div className="chooseCategoryInput">
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={categoryChooseStep?.category}
                                    sx={{ width: 300 }}
                                    defaultValue={defaultValue}
                                    onInputChange={handleSearchChange}
                                    onChange={handleCategory}
                                    filterOptions={filterOptions}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            value={params}
                                            {...params}
                                            label="Select Category"
                                        />
                                    )}
                                    renderOption={(props, option) => {
                                        const isCreateNewCategory =
                                            option.label ===
                                            "Create New Category";
                                        return (
                                            <li {...props}>
                                                {isCreateNewCategory ? (
                                                    <span
                                                        className={
                                                            isCreateNewCategory
                                                                ? "createNewCategoryItem"
                                                                : ""
                                                        }
                                                    >
                                                        {option.label}
                                                    </span>
                                                ) : (
                                                    option.label
                                                )}
                                            </li>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {category === "Create" && (
                <div className="createCategory">
                    <div className="chooseCategoryBox width22 marginRight20">
                        <label>Select Type:- Step 1 of 2</label>
                        <div className="chooseCategoryInput">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Select Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="type"
                                    label="Select Type"
                                    onChange={handleNewCategory}
                                >
                                    {Array.from(
                                        new Set(
                                            categoryList[0]?.map(
                                                (category) => category.type
                                            )
                                        )
                                    )?.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {newCategory.type && (
                        <>
                            <div className="createCategoryBox">
                                <label>Create Category:- Step 2 of 2</label>
                                <div className="createCategoryInput">
                                    <TextField
                                        className="muiInput"
                                        onChange={handleNewCategory}
                                        id="outlined-basic"
                                        label="Enter Category Name"
                                        name="category"
                                        type="text"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <CustomButton
                                handleClick={handleCreateCategory}
                                classId={`createCategoryBtn pointer`}
                            >
                                {isLoading ? (
                                    <CircularProgress
                                        sx={{ color: "white" }}
                                        size={20}
                                    />
                                ) : (
                                    "Add New Category"
                                )}
                            </CustomButton>
                        </>
                    )}
                </div>
            )}
        </section>
    );
};

export default Category;
