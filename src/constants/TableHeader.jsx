// const columns = ["Name", "Company", "City", "State"];
import { Link } from "react-router-dom";
import { sewzeeImages } from "../assets";

export const productTableHeader = [
    {
        name: "images",
        label: "Product Image",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                let image;

                if (value?.length > 0) {
                    image = value[0];
                } else {
                    image = sewzeeImages.NoImage;
                }

                return (
                    <img
                        className="tableImage"
                        src={image}
                        alt="productImage"
                        width="50"
                        height="50"
                    />
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Product Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "price",
        label: "Product Price",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "category",
        label: "Product Category",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "instock",
        label: "Product In Stock",
        options: {
            customBodyRender: (value) => {
                let inStock;

                if (value === 1) {
                    inStock = "Yes";
                } else {
                    inStock = "No";
                }

                return <span>{inStock}</span>;
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link
                            to={`/products/edit/${value}`}
                            className="actionBtn"
                        >
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];

export const orderTableHeader = [
    {
        name: "productDetails",
        label: "Product Details",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "orderQuantity",
        label: "Order Quantity",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "amount",
        label: "Amount",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "orderDate",
        label: "Order Date",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/products`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
