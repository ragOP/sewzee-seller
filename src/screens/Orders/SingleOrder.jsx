import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Orders.css";
import API from "../../services/common";
import { SingleOrderToggleItems } from "../../constants";
import OrderPageHeader from "../../components/PageHeader/OrderPageHeader";
import { SingleOrderTopLoader } from "../../ui/SkeltonLoader/SkeltonLoader";
import OrderInfoHeader from "../../components/Orders/OrderInfoHeader/OrderInfoHeader";
import OrderDeatilsBody from "../../components/OrderDeatilsBody/OrderDeatilsBody";
import OrderTimeline from "../../components/Orders/OrderTimeline/OrderTimeline";
import BillingBreakdown from "../../components/Orders/BillingBreakdown/BillingBreakdown";
import HeaderToggle from "../../components/HeaderToggle/HeaderToggle";
import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";
import { sewzeeImages } from "../../assets";
import { toast } from "react-hot-toast";

const SingleOrder = () => {
    const [actionType, setActionType] = useState("");
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [toggleType, setToggleType] = useState("Order Details");
    const [orderData, setOrderData] = useState({
        isLoading: true,
        data: [],
    });

    const fetchData = async () => {
        try {
            const response = await API.get(`api/seller/order/${orderId}`);
            setOrderData({
                isLoading: false,
                data: response?.data?.data,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setOrderData({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = (type) => {
        setToggleType(type);
    };

    const handleAcceptReject = async () => {
        try {
            await API.patch(`api/seller/order/${orderId}`, {
                status: actionType.toLowerCase(),
            });
            toast.success("Order Updated Successfully");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div className="ordersWrapper">
            <OrderPageHeader
                headerTitle={"Back"}
                type="back"
                handleBack={() => navigate("/orders")}
            />
            {orderData.isLoading ? (
                <SingleOrderTopLoader />
            ) : (
                <OrderInfoHeader
                    setActionType={setActionType}
                    handleShow={handleShow}
                    orderInfo={{
                        orderId: orderData.data?.id,
                        customerName: orderData?.data?.bname,
                        status: orderData?.data?.status,
                    }}
                />
            )}
            <HeaderToggle
                toggleList={SingleOrderToggleItems}
                handleToggle={handleToggle}
                toggleType={toggleType}
            />
            <OrderDeatilsBody>
                {toggleType === "Timeline" && (
                    <OrderTimeline timelineData={orderData?.data?.timeline} />
                )}
                {toggleType === "Billing Breakdown" && (
                    <BillingBreakdown
                        billingData={orderData?.data?.price_breakdown}
                    />
                )}
            </OrderDeatilsBody>
            <OrderConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                modalData={{
                    body: `Are you sure you want to ${actionType} this order?`,
                    image:
                        actionType === "Accept"
                            ? sewzeeImages?.Accept
                            : sewzeeImages?.Warning,
                    title: `Order ${actionType} Confirmation`,
                    btnOne: `Yes, ${actionType}`,
                    btnTwo: "No, Keep Pending",
                    handleClick: handleAcceptReject,
                }}
            />
        </div>
    );
};

export default SingleOrder;
