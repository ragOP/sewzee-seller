import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "./Collection.css";
import { CustomButton } from "../../../ui/constants";
import API from "../../../services/common";
import { toast } from "react-hot-toast";
import { ADDTYPECATEGORYCOLLECTION } from "../../../hooks/constant";

const Collection = ({ formState, dispatch, type }) => {
    const [isLoading, setLsloading] = useState(false);
    const [collection, setCollection] = useState(
        type === "edit" ? "Choose" : ""
    );
    const [newCollection, setNewCollection] = useState("");
    const [collectionList, setCollectionList] = useState([]);

    const loadCategory = async () => {
        try {
            const res = await API.get("/api/seller/collection");
            setCollectionList(res?.data?.collection);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        loadCategory();
    }, []);

    const handleCollection = (e) => {
        dispatch({
            type: ADDTYPECATEGORYCOLLECTION,
            payload: {
                name: "collection",
                value: e.target.value,
            },
        });
    };

    const handleCreateCollection = async (e) => {
        e.preventDefault();
        if (!newCollection) return toast.error("Please enter collection name");
        setLsloading(true);
        try {
            const res = await API.post("/api/seller/collection", {
                name: newCollection,
            });
            if (res.status === 200) {
                toast.success("Collection added successfully");
                loadCategory();
                setLsloading(false);
                setCollection("Choose");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setLsloading(false);
        }
    };

    return (
        <section className="collectionWrapper">
            <div className="categoryContainer">
                <div
                    onClick={() => setCollection("Choose")}
                    className={`categoryOptions marginRight20 ${
                        collection === "Choose" && "categoryActive"
                    }`}
                >
                    <p>Choose collection</p>
                </div>
                <div
                    onClick={() => setCollection("Create")}
                    className={`categoryOptions marginRight20 ${
                        collection === "Create" && "categoryActive"
                    }`}
                >
                    <p>Create collection</p>
                </div>
            </div>
            {collection === "Choose" && (
                <div className="chooseCategory">
                    <div className="chooseCategoryBox">
                        <label>Select Collection</label>
                        <div className="chooseCategoryInput">
                            <select
                                required
                                onChange={handleCollection}
                                value={formState?.collection}
                            >
                                <option>Select Collection</option>
                                {collectionList?.map((item, index) => (
                                    <option value={item.id} key={index}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {collection === "Create" && (
                <div className="createCategory">
                    <div className="createCategoryBox">
                        <label>Collection Name</label>
                        <div className="createCategoryInput">
                            <input
                                onChange={(e) =>
                                    setNewCollection(e.target.value)
                                }
                                type="text"
                                placeholder="Enter Collection Name"
                            />
                        </div>
                    </div>
                    <CustomButton
                        handleClick={handleCreateCollection}
                        classId={`createCategoryBtn1 pointer`}
                    >
                        {isLoading ? (
                            <CircularProgress
                                sx={{ color: "white" }}
                                size={20}
                            />
                        ) : (
                            "Add New Collection"
                        )}
                    </CustomButton>
                </div>
            )}
        </section>
    );
};

export default Collection;
