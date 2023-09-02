// iocns for order timeline
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

// icon for sidebar
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BsPersonSquare, BsImages } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import { TbBrandAsana } from "react-icons/tb";
import { FaTextWidth } from "react-icons/fa";
import { GiLoincloth, GiSewingMachine } from "react-icons/gi";

export const HandleTimelineData = (item) => {
    let data;
    const getTime = new Date(item?.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    switch (item.status) {
        case "placed":
            data = {
                icon: <AddTaskIcon />,
                title: "Order Placed",
                description: item?.body,
                time: getTime,
                color: "primary",
            };
            break;
        case "accepted":
            data = {
                icon: <DoneIcon />,
                title: "Order Accepted",
                description: "Seller accepted the order.",
                time: getTime,
                color: "primary",
            };
            break;
        case "packed":
            data = {
                icon: <LocalShippingIcon />,
                title: "Ready to Ship",
                description: "Order has been packed and is ready for shipment.",
                time: getTime,
                color: "primary",
            };
            break;
        case "pickup":
            data = {
                icon: <DirectionsIcon />,
                title: "Courier Pickup",
                description: "Courier picked up the package for delivery.",
                time: getTime,
                color: "primary",
            };
            break;
        case "reached":
            data = {
                icon: <LocationOnIcon />,
                title: "Package Arrived",
                description:
                    "Package reached the nearest location for delivery.",
                time: getTime,
                color: "primary",
            };
            break;
        case "Out for delivery.":
            data = {
                icon: <DeliveryDiningIcon />,
                title: "Out for Delivery",
                description: "Package is out for delivery.",
                time: getTime,
                color: "primary",
            };
            break;
        case "delivered":
            data = {
                icon: <DoneAllIcon />,
                title: "Order Delivered",
                description:
                    "Order has been successfully delivered to the customer.",
                time: getTime,
                color: "success",
            };
            break;
        case "rejected":
            data = {
                icon: <CancelIcon />,
                title: "Order Rejected",
                description: "Seller rejected the order",
                time: getTime,
                color: "error",
            };
            break;
        default:
            break;
    }

    return data;
};

// Page Header

// export const IconHandaler = (title, type) => {
//     let icon;

//     switch (title) {
//         case "Dashboard":
//             icon = type ? (
//                 <DashboardIcon
//                     style={{
//                         color: "white",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             ) : (
//                 <DashboardIcon
//                     style={{
//                         color: "black",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             );
//             break;
//         case "Users":
//             icon = type ? (
//                 <AccountCircleIcon
//                     style={{
//                         color: "white",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             ) : (
//                 <AccountCircleIcon
//                     style={{
//                         color: "black",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             );
//             break;
//         case "Banner":
//             icon = type ? (
//                 <PermMediaIcon
//                     style={{
//                         color: "white",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             ) : (
//                 <PermMediaIcon
//                     style={{
//                         color: "black",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             );
//             break;
//         case "Customer":
//             icon = type ? (
//                 <BsPersonSquare fill="white" size={25} />
//             ) : (
//                 <BsPersonSquare fill="black" size={25} />
//             );
//             break;
//         case "Boutiques":
//             icon = type ? (
//                 <GiLoincloth fill="white" size={25} />
//             ) : (
//                 <GiLoincloth fill="black" size={25} />
//             );
//             break;
//         case "Tailors":
//             icon = type ? (
//                 <GiSewingMachine fill="white" size={25} />
//             ) : (
//                 <GiSewingMachine fill="black" size={25} />
//             );
//             break;
//         case "Drivers":
//             icon = type ? (
//                 <MdDeliveryDining fill="white" size={25} />
//             ) : (
//                 <MdDeliveryDining fill="black" size={25} />
//             );
//             break;
//         case "Banner & Thumb..":
//             icon = type ? (
//                 <BsImages fill="white" size={25} />
//             ) : (
//                 <BsImages fill="black" size={25} />
//             );
//             break;
//         case "Brands":
//             icon = type ? (
//                 <TbBrandAsana fill="white" size={25} />
//             ) : (
//                 <TbBrandAsana fill="black" size={25} />
//             );
//             break;
//         case "Footer Text":
//             icon = type ? (
//                 <FaTextWidth fill="white" size={25} />
//             ) : (
//                 <FaTextWidth fill="black" size={25} />
//             );
//             break;
//         case "Category":
//             icon = type ? (
//                 <BiCategory
//                     style={{
//                         color: "white",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             ) : (
//                 <BiCategory
//                     style={{
//                         color: "black",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             );
//             break;
//         case "Orders":
//             icon = type ? (
//                 <FiShoppingCart
//                     style={{
//                         color: "white",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             ) : (
//                 <FiShoppingCart
//                     style={{
//                         color: "black",
//                         fontSize: "1.8rem",
//                     }}
//                 />
//             );
//             break;
//         default:
//             break;
//     }

//     return icon;
// };
export const IconHandaler = (title, type) => {
    const iconMapping = {
        Dashboard: type ? (
            <DashboardIcon style={{ color: "white", fontSize: "1.8rem" }} />
        ) : (
            <DashboardIcon style={{ color: "black", fontSize: "1.8rem" }} />
        ),
        Users: type ? (
            <AccountCircleIcon style={{ color: "white", fontSize: "1.8rem" }} />
        ) : (
            <AccountCircleIcon style={{ color: "black", fontSize: "1.8rem" }} />
        ),
        Banner: type ? (
            <PermMediaIcon style={{ color: "white", fontSize: "1.8rem" }} />
        ) : (
            <PermMediaIcon style={{ color: "black", fontSize: "1.8rem" }} />
        ),
        Customer: type ? (
            <BsPersonSquare fill="white" size={25} />
        ) : (
            <BsPersonSquare fill="black" size={25} />
        ),
        Boutiques: type ? (
            <GiLoincloth fill="white" size={25} />
        ) : (
            <GiLoincloth fill="black" size={25} />
        ),
        Tailors: type ? (
            <GiSewingMachine fill="white" size={25} />
        ) : (
            <GiSewingMachine fill="black" size={25} />
        ),
        Drivers: type ? (
            <MdDeliveryDining fill="white" size={25} />
        ) : (
            <MdDeliveryDining fill="black" size={25} />
        ),
        "Banner & Thumb..": type ? (
            <BsImages fill="white" size={25} />
        ) : (
            <BsImages fill="black" size={25} />
        ),
        Brands: type ? (
            <TbBrandAsana fill="white" size={25} />
        ) : (
            <TbBrandAsana fill="black" size={25} />
        ),
        "Footer Text": type ? (
            <FaTextWidth fill="white" size={25} />
        ) : (
            <FaTextWidth fill="black" size={25} />
        ),
        Category: type ? (
            <BiCategory style={{ color: "white", fontSize: "1.8rem" }} />
        ) : (
            <BiCategory style={{ color: "black", fontSize: "1.8rem" }} />
        ),
        Orders: type ? (
            <FiShoppingCart style={{ color: "white", fontSize: "1.8rem" }} />
        ) : (
            <FiShoppingCart style={{ color: "black", fontSize: "1.8rem" }} />
        ),
    };

    const icon = iconMapping[title] || null;

    return icon;
};
