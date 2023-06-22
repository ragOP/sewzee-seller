import "./Products.css"
import PageHeader from "../../components/PageHeader/PageHeader"
import { EnhancedTable } from "../../components/Table/Table"

import { productData } from "../../dummy"
import { productTableHeader } from "../../constants/TableHeader"
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Products = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [rowsToDelete, setRowsToDelete] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null)


    const handleDeleteClick = (rowsDeleted, data) => {
        console.log(rowsDeleted, data);
        if (rowsDeleted.data.length === 1) {
            const selectedRow = productData[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        }
        setRowsToDelete(rowsDeleted);
        handleShow();
    };

    // const handleDeleteConfirmation = () => {
    //     const deletedRows = rowsToDelete.data.map((row) => row.index);
    //     handleDelete(deletedRows);
    //     deleteModalOpen(false);
    // };

    // const handleDeleteCancel = () => {
    //     deleteModalOpen(false);
    // };



    return (
        <div className="productWrapper">
            <PageHeader
                headerTitle="Products"
                headerBtnName="Add Product"
                handleClick={() => navigate("/products/add")}
            />
            <div className="productTableWtapper">
                <EnhancedTable
                    tableHeader={productTableHeader}
                    tableData={productData}
                    tableTitle="Products"
                    handleDelete={handleDeleteClick}
                    deleteModalOpen={setModalOpen}
                />
            </div>
            <DeleteConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                modalData={selectedProduct}
                isSingle={selectedProduct ? true : false}
            />
        </div>
    )
}

export default Products