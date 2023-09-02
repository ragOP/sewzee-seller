// const columns = ["Name", "Company", "City", "State"];
import { Link } from "react-router-dom";
import { sewzeeImages } from "../assets";
import { useOrder } from "../hooks/useOrder";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
        name: "categoryName",
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
        name: "images",
        label: "Product Details",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let image;
                if (value?.length > 0) {
                    image = value[0];
                } else {
                    image = sewzeeImages.NoImage;
                }
                const getFullData = tableMeta?.fullData?.find(
                    (item) => item.id === tableMeta.rowData[4]
                );

                return (
                    <div className="orderProductdetails">
                        <img src={image} alt="" />
                        <div className="orderProductdetails__text">
                            <p>{getFullData?.product_name}</p>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        name: "quantity",
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
        name: "created_at",
        label: "Order Date",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/orders/${value}`}>
                            <VisibilityIcon />
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
