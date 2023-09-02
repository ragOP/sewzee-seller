import CloseIcon from "@mui/icons-material/Close";

import "./OrderConfirmation.css";
import CustomModal from "../../ui/CustomModal/CustomModal";
import { CustomButton } from "../../ui/constants";

const OrderConfirmation = ({
    open,
    handleClose,
    title,
    modalData,
    handleDelete,
    isSingle,

    singleDeletecompoment,
}) => {
    return (
        <CustomModal open={open} handleClose={handleClose}>
            <div className="orderConfirmationWrapper">
                <div className="orderConfirmationHeader">
                    <h6>{modalData.title}</h6>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="orderConfirmationBody">
                    <img src={modalData.image} alt="" />
                    <h4>{modalData.body}</h4>
                </div>
                <div className="orderConfirmationFooter">
                    <CustomButton
                        handleClick={modalData.handleClick}
                        classId="orderBtn acceptBtn"
                    >
                        {modalData?.btnOne}
                    </CustomButton>
                    <CustomButton
                        handleClick={handleClose}
                        classId="orderBtn2 keepBtn"
                    >
                        {modalData?.btnTwo}
                    </CustomButton>
                </div>
            </div>
        </CustomModal>
    );
};

export default OrderConfirmation;
