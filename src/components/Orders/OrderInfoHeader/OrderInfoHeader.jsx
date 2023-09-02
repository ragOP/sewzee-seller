import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import { CustomButton } from "../../../ui/constants";
import "./OrderInfoHeader.css";

const OrderInfoHeader = ({ orderInfo, setActionType, handleShow }) => {
    const handleModalc = (value) => {
        setActionType(value);
        handleShow();
    };
    return (
        <div className="orderInfoHeaderWrapper">
            <div className="orderInfoHeaderLeft">
                <h2>{orderInfo?.customerName}</h2>
                <p>Order Id - {orderInfo?.orderId}</p>
                <button
                    className={
                        orderInfo?.status === "accepted"
                            ? "ongoing"
                            : orderInfo?.status
                    }
                >
                    {orderInfo?.status === "accepted"
                        ? "ongoing"
                        : orderInfo?.status}
                </button>
            </div>
            <div className="orderInfoHeaderRight">
                {orderInfo?.status === "pending" && (
                    <div className="flex gap5">
                        <CustomButton
                            handleClick={() => handleModalc("Accept")}
                            classId="marginRight10 orderBtn acceptBtn"
                        >
                            <DoneIcon /> Accept
                        </CustomButton>
                        <CustomButton
                            handleClick={() => handleModalc("Reject")}
                            classId="orderBtn rejectBtn"
                        >
                            <CloseIcon /> Reject
                        </CustomButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderInfoHeader;
