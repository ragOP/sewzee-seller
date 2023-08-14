import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Products.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";

import { productTableHeader } from "../../constants/TableHeader";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";

import { useDispatch, useSelector } from "react-redux";
import {
    getApprovdProduct,
    getProductCategory,
} from "../../store/actions/productAction/productAction";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";
import { toast } from "react-hot-toast";
import API from "../../services/common";

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((state) => state);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsToDelete, setRowsToDelete] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDeleteClick = (rowsDeleted, data) => {
        if (rowsDeleted.data.length === 1) {
            const selectedRow = products?.products[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        } else {
            setSelectedProduct(null);
            const selectedRows = rowsDeleted.data.map((item) => {
                return products?.products[item.index];
            });
            setSelectedProduct(selectedRows);
        }
        handleShow();
    };

    const handlePageLimit = (limit) => {
        setRowsPerPage(limit);
    };
    const handleDeleteConfirmation = async () => {
        if (selectedProduct?.length > 0) {
            // Multiple Item Delete
            const selectedIds = selectedProduct.map((item) => item.id);
            selectedIds.forEach(async (id, index, data) => {
                try {
                    await API.delete(`api/seller/product/${id}`);
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
                if (index === data?.length - 1) {
                    toast.success("Deleted Successfully");
                    dispatch(getApprovdProduct());
                }
            });
        } else {
            //  Single Item Delete
            try {
                const response = await API.delete(
                    `api/seller/product/${selectedProduct?.id}`
                );
                if (response?.status === 200) {
                    dispatch(getApprovdProduct());
                    toast.success(response?.data?.message);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }

        handleClose();
    };

    useEffect(() => {
        dispatch(getProductCategory());
        dispatch(getApprovdProduct());
    }, []);

    return (
        <div className="productWrapper">
            <PageHeader
                headerTitle="Products"
                headerBtnName="Add Product"
                handleClick={() => navigate("/products/add")}
                isBtn={true}
            />
            <div className="productTableWtapper">
                {products?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={productTableHeader}
                        tableData={products?.products}
                        tableTitle="Products"
                        handleDelete={handleDeleteClick}
                        deleteModalOpen={setModalOpen}
                        handlePageLimit={handlePageLimit}
                    />
                )}
            </div>
            <DeleteConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                handleDelete={handleDeleteConfirmation}
                modalData={{
                    productName: selectedProduct?.name,
                    productImage: selectedProduct?.images[0],
                    productPrice: selectedProduct?.price,
                }}
                isSingle={selectedProduct ? true : false}
            />
        </div>
    );
};

export default Products;
