import { CiEdit } from "react-icons/ci";
const ProfileRightBusinessDetails = ({ formState, reducerDispatch }) => {
    const { user, business } = formState;
    return (
        <div>
            <div className="profilePersonalInfo">
                <div className="profilePersonalHeader">
                    <h6>
                        {user?.isBrand === 1 ? "Brand" : "Boutique"} Information
                    </h6>
                    <div className="profilePersonalEdit">
                        <span>Edit</span>
                        <CiEdit />
                    </div>
                </div>
                <div className="profilePersonalInfoContent">
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalImg">
                            <img src={business?.logo} alt="" />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Name</p>
                            <span>{business?.name}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Nick Name</p>
                            <span> {business?.nickname}</span>
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Tagline</p>
                            <span>{business?.tagline}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Website</p>
                            <span>{business?.website}</span>
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem width100">
                            <p>Description</p>
                            <span>{business?.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileRightBusinessDetails;
