import CloseIcon from "@mui/icons-material/Close";

// local imports
import "./DeleteConfirmation.css";
import CustomModal from "../../ui/CustomModal/CustomModal";
import { CustomButton } from "../../ui/constants";

const DeleteConfirmation = ({
    open,
    handleClose,
    handleDelete,
    isSingle,
    modalData,
    singleDeletecompoment,
}) => {
    console.log(modalData);

    return (
        <CustomModal open={open} handleClose={handleClose}>
            <div className="deleteConfirmationWrapper">
                <div className="deleteConfirmationHeader">
                    <h6>Delete Product Confirmation</h6>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div
                    className={`deleteConfirmationBody ${
                        !isSingle && "flexJustifyCenter"
                    }`}
                >
                    {isSingle ? (
                        <div className="deleteConfirmationSingleProduct">
                            <h4>
                                Are you sure you want to delete this product?
                            </h4>
                            <div className="deleteConfirmationSingleProductContent">
                                <div className="deleteModalImage">
                                    <img src={modalData?.productImage} alt="" />
                                </div>
                                <div className="deleteModalContent">
                                    <h5> Name: {modalData?.productName}</h5>
                                    {modalData?.productPrice && (
                                        <p>Price: {modalData?.productPrice}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h5>
                            Are you sure you want to delete all this product?
                        </h5>
                    )}
                </div>
                <div className="deleteConfirmationFooter">
                    <CustomButton
                        handleClick={handleDelete}
                        classId="confirmationBtn confirmationBtn--yes"
                    >
                        Yes
                    </CustomButton>
                    <CustomButton classId="confirmationBtn confirmationBtn--no">
                        No
                    </CustomButton>
                </div>
            </div>
        </CustomModal>
    );
};

export default DeleteConfirmation;
