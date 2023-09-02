import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Orders.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { orderTableHeader } from "../../constants/TableHeader";
import { getOrdersThunk } from "../../store/actions/ordersAction/ordersAction";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const OrderDeatils = () => {
    
}



const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, []);

    

    useEffect(() => {
        if(orders?.orders?.length > 0) {
            orders?.orders?.forEach((order) => {
                
            });
        }
    }, [orders]);

    return (
        <section className="ordersWrapper">
            <PageHeader headerTitle="Orders" isBtn={false} />
            <div className="orderTableWtapper">
                {orders?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={orderTableHeader}
                        tableData={orders?.orders}
                        tableTitle="Orders"
                    />
                )}
            </div>
           
        </section>
    );
};

export default Orders;
