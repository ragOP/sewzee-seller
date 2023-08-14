import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Orders.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { orderTableHeader } from "../../constants/TableHeader";
import { getOrdersThunk } from "../../store/actions/ordersAction/ordersAction";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, []);

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
