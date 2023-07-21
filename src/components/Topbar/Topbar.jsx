import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Popover, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import "./Topbar.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileImageLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#7D5FFE",
    color: "white",
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Topbar = ({ open, toggleDrawer, handleLogout }) => {
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state);
    const { business } = profile?.sellerData;
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="#2e2ab9"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <div className="profileImge">
                        {profile?.isLoading ? (
                            <ProfileImageLoader />
                        ) : (
                            <img
                                onClick={handleClick}
                                src={business?.logo}
                                alt=""
                            />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Popover
                open={popoverOpen}
                style={{ marginTop: "15px", padding: "20px" }}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                placement="bottom-end"
            >
                <ul className="m-0 popper">
                    <Link
                        className="text-black"
                        style={{ textDecoration: "none" }}
                        to={"/profile"}
                    >
                        <li onClick={() => setAnchorEl(null)}>
                            <FaUserAlt size="20" /> Profile
                        </li>
                    </Link>
                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                        <BiLogOutCircle size="20" /> Logout
                    </li>
                </ul>
            </Popover>
        </>
    );
};

export default Topbar;
