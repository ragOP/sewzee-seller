import "./PageHeader.css";
import { CustomButton } from "../../ui/constants";
import { sewzeeImages } from "../../assets";

const PageHeader = ({
    headerTitle,
    handleClick,
    headerBtnName,
    type,
    handleBack,
    isBtn,
}) => {
    return (
        <div className="topHeaderWrapper">
            <div className="topHeaderTitle">
                {type === "back" && (
                    <div onClick={handleBack} className="topHeaderBackBtn">
                        {" "}
                        <img src={sewzeeImages.BackIcon} alt="backIcon" />
                    </div>
                )}
                <h5>{headerTitle}</h5>
            </div>
            {isBtn && (
                <div className="topHeaderButtons">
                    {type !== "back" && (
                        <CustomButton
                            handleClick={handleClick}
                            classId="topHeaderBtn pointer"
                        >
                            {headerBtnName}
                        </CustomButton>
                    )}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
