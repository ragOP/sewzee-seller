import "./Products.css"
import PageHeader from "../../components/PageHeader/PageHeader"
import { EnhancedTable } from "../../components/Table/Table"

import { productData } from "../../dummy"
import { productTableHeader } from "../../constants/TableHeader"
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import API from "../../services/common"
import { useDispatch, useSelector } from "react-redux"
import { getApprovdProduct, getProductCategory } from "../../store/actions/productAction/productAction"


const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { products } = useSelector(state => state)
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



    useEffect(() => {
        dispatch(getProductCategory())
        dispatch(getApprovdProduct())
    }, [])



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
                    tableData={products?.products}
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