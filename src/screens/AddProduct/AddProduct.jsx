import { useNavigate } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import "./AddProduct.css"
import ProductTopHead from "../../components/Products/ProductTopHead/ProductTopHead"
import ProductsBasicInfo from "../../components/Products/ProductsBasicInfo/ProductsBasicInfo"
import ProductImageVideos from "../../components/Products/ProductImageVideos/ProductImageVideos"

const AddProduct = () => {
    const navigate = useNavigate()
    return (
        <div className="addProductWrapper">
            <PageHeader
                headerTitle="Add Products"
                headerBtnName="Add Product"
                type="back"
                handleBack={() => navigate("/products")}
                handleClick={() => navigate("/products/add")}
            />
            <ProductTopHead title="Product Info" />
            <ProductsBasicInfo />
            <ProductTopHead title="Image and Video" />
            <ProductImageVideos />
        </div>
    )
}

export default AddProduct