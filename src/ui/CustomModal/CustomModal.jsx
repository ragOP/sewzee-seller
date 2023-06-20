import { Modal } from '@mui/material'


const CustomModal = ({ open, handleClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {children}
        </Modal>
    )
}

export default CustomModal