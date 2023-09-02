import { useSelector } from "react-redux";

export const useOrder = () => {
    const orders = useSelector((state) => state.orders);

    const getSingleOrder = (id) => {
        return orders.ordersList.find((order) => order.id === id);
    };

    return {
        orders,
        getSingleOrder,
    };
};
