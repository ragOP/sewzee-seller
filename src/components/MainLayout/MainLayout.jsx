import { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useNavigate } from "react-router-dom";


import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import useStyles from './MainLayoutStyle';
import './MainLayout.css';


const MainLayout = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        navigate("/");
        localStorage.clear();
    };
    const handleListClick = (url) => {
        navigate(url);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Topbar
                open={open}
                handleLogout={handleLogout}
                toggleDrawer={toggleDrawer}
            />
            <Sidebar
                open={open}
                toggleDrawer={toggleDrawer}
                classes={classes}
                handleListClick={handleListClick}
            />
            <Box
                component="main"
                className="dashboard-outlet"
                sx={{
                    backgroundColor: (theme) =>
                        props?.location?.pathname.includes("/add")
                            ? "#fff"
                            : theme.palette.grey[100],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                {props?.children}
            </Box>
        </Box>
    )
}

export default MainLayout