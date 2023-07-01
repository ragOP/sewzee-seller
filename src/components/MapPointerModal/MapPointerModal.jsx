

import CustomModal from "../../ui/CustomModal/CustomModal"
import MapContainer from "../MapContainer/MapContainer"


const MapPointerModal = ({ open, handleClose }) => {
    return (
        <CustomModal open={open} handleClose={handleClose}>
            <MapContainer />
        </CustomModal>
    )
}

export default MapPointerModal