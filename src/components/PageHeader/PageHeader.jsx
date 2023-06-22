
import "./PageHeader.css"
import { CustomButton } from "../../ui/constants"

const PageHeader = ({ headerTitle, handleClick, headerBtnName }) => {
    return (
        <div className='topHeaderWrapper'>
            <div className='topHeaderTitle'>
                <h5>{headerTitle}</h5>
            </div>
            <div className='topHeaderButtons'>
                <CustomButton handleClick={handleClick} classId="topHeaderBtn">{headerBtnName}</CustomButton>
            </div>

        </div>
    )
}

export default PageHeader