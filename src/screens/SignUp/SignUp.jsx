import { TextField } from "@mui/material"
import { toast } from "react-hot-toast";
import { useState, useEffect, useReducer } from "react"
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// local imports
import "../Login/Login.css"
import { CustomButton } from "../../ui/constants"
import { sewzeeImages } from "../../assets";
import API from "../../services/common";

const SignUp = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }


    const handleLogin = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        setIsDisabled(true);
        console.log(inputData)
        try {
            const req = await API.post("/api/auth/sellerSignup", inputData);
            if (req.status === 200) {
                localStorage.setItem("token", req.data.token);
                localStorage.setItem("isComplete", req.data.isComplete)
                if (req.data.isComplete === false) {
                    localStorage.setItem("userEmail", req.data.email)
                }
                navigate("/onboarding")
                setIsDisabled(false);
                setIsLoading(false);
            }


        } catch (error) {
            toast.error(error.response.data.message);
            setIsDisabled(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }

    }, [token])


    return (
        <div className="loginWrapper">
            <div className="loginRight" data-aos="fade-left" >
                <div className='loginRightContent'>
                    <p>Revolutionize Shopping:</p>
                    <h6>DISCOVER</h6>
                    <h6>LOCAL FASHION</h6>
                    <h6>GEMS</h6>
                </div>
            </div>
            <div className="loginLeft" data-aos="fade-right">
                <div className="loginLeftContainer">
                    <div className="loginLeftInfo">
                        <img src={sewzeeImages.sewzeeLogo} alt="sewzee Logo" />
                        <div className="loginLeftTitle">
                            <h6>Welcome to the Sewzee Seller Panel</h6>
                            <p>Sign Up and Get Started!</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className='loginLeftInputsContainer'>
                        <div className='loginLeftInput'>
                            <TextField
                                onChange={handleChange}
                                id="email"
                                name="email"
                                size="small"
                                label="Email"
                                type="email"
                                required
                            />
                        </div>
                        <div className='loginLeftInput'>
                            <TextField
                                onChange={handleChange}
                                id="password"
                                name="password"
                                size="small"
                                label="Password"
                                required
                                type={`${passwordVisible ? "text" : "password"}`}
                            />
                            <div onClick={() => setPasswordVisible(!passwordVisible)} className="passwordToggle">
                                {
                                    passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />
                                }
                            </div>
                        </div>
                        {/* <div className='flexJustifyEnd'>
                            <p className='forgotPassword'>Forgot Password?</p>
                        </div> */}
                        <div className=''>
                            <CustomButton isDisabled={isDisabled} classId="loginBtn">{isLoading ? <CircularProgress sx={{ color: "white" }}
                                size={20} /> : "Sign up"}</CustomButton>
                        </div>
                        <div className='flexJustifyCenter marginY10'>
                            <p className='dontHaveAccount'>Already have an account? <span onClick={() => navigate("/")} className='pointer'>Login</span></p>
                        </div>
                    </form>

                </div>
            </div>

        </div >
    )
}

export default SignUp