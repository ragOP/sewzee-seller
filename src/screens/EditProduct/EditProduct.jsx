import { toast } from "react-hot-toast";
import { useReducer, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

import "../AddProduct/AddProduct.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import ProductTopHead from "../../components/Products/ProductTopHead/ProductTopHead";
import ProductsBasicInfo from "../../components/Products/ProductsBasicInfo/ProductsBasicInfo";
import ProductImageVideos from "../../components/Products/ProductImageVideos/ProductImageVideos";
import Category from "../../components/Products/Category/Category";
import Pricing from "../../components/Products/Pricing/Pricing";
import Variants from "../../components/Products/Variants/Variants";
import Type from "../../components/Products/Type/Type";
import SeoOptions from "../../components/Products/SeoOptions/SeoOptions";
import Collection from "../../components/Products/Collection/Collection";
import API from "../../services/common";

import editProductsReducer from "../../hooks/editProductsReducer";
import { SETINITIALDATA } from "../../hooks/constant";

const EditProduct = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const [formState, storeDispatch] = useReducer(
        editProductsReducer,
        productData
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/api/seller/product/${productId}`);

                console.log(res.data.data);
                if (res.status === 200) {
                    setProductData(res.data.data);
                    storeDispatch({
                        type: SETINITIALDATA,
                        payload: res.data.data,
                    });
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };
        fetchProduct();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            delete formState?.id;
            delete formState?.created_at;
            delete formState?.updated_at;
            delete formState?.categoryName;

            const res = await API.put(
                `/api/seller/product/${productId}`,
                formState
            );
            console.log(res);
            if (res.status === 200) {
                toast.success("Product added successfully");
                setIsLoading(false);
                navigate("/products");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

    console.log(formState);
    console.log(productData);

    return (
        <form onSubmit={handleSubmit} className="addProductWrapper">
            <PageHeader
                headerTitle="Edit Products"
                headerBtnName="Add Product"
                type="back"
                handleBack={() => navigate("/products")}
                handleClick={() => navigate("/products/add")}
            />
            <ProductTopHead title="Product Info" />
            <ProductsBasicInfo formState={formState} dispatch={storeDispatch} />
            <ProductTopHead title="Image and Video" />
            <ProductImageVideos
                formState={formState}
                dispatch={storeDispatch}
            />
            <ProductTopHead title="Type" />
            <Type formState={formState} dispatch={storeDispatch} />
            <ProductTopHead title="Category" />
            <Category
                formState={formState}
                dispatch={storeDispatch}
                type="edit"
            />
            <ProductTopHead title="Collection" />
            <Collection
                formState={formState}
                dispatch={storeDispatch}
                type="edit"
            />
            <ProductTopHead title="Pricing and Dicount" />
            <Pricing formState={formState} dispatch={storeDispatch} />

            <Variants formState={formState} dispatch={storeDispatch} />
            <ProductTopHead title="SEO Tags" />
            <SeoOptions formState={formState} dispatch={storeDispatch} />
            <div className="addProductBtn">
                <button type="submit">
                    {isLoading ? (
                        <CircularProgress sx={{ color: "white" }} size={20} />
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </form>
    );
};

export default EditProduct;
