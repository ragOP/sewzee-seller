import { styled } from "@mui/material/styles";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { sewzeeImages } from "../../assets";
import { sidebarList } from "../../constants";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiTypography-body1": {
        fontFamily: "Lato !important",
    },
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        height: "100vh",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        fontFamily: "Lato",
        backgroundColor: "#7D5FFE",
        color: "white",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const IconHandaler = (title, type) => {
    let icon;

    switch (title) {
        case "Dashboard":
            icon = type ? (
                <DashboardIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <DashboardIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Users":
            icon = type ? (
                <AccountCircleIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <AccountCircleIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Products":
            icon = type ? (
                <Inventory2Icon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <Inventory2Icon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Orders":
            icon = type ? (
                <ShoppingCartIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <ShoppingCartIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        default:
            break;
    }

    return icon;
};

const Sidebar = ({ toggleDrawer, open, classes, handleListClick }) => {
    const location = window.location.pathname;

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#edf1fa",
                    px: [1],
                }}
            >
                <div className="sidebar-logo">
                    <img src={sewzeeImages.sewzeeLogo} alt="" />
                </div>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon className={classes.closeDrawer} />
                </IconButton>
            </Toolbar>
            <Divider />

            <List className={classes.listDiv}>
                {sidebarList.map((item) => (
                    <ListItem
                        key={item.id}
                        button
                        className={
                            location?.includes(item.link)
                                ? classes.selectedList
                                : classes.unSelectedList
                        }
                        onClick={() => handleListClick(item.link)}
                    >
                        <ListItemIcon>
                            {location?.includes(item?.link)
                                ? IconHandaler(item?.label, true)
                                : IconHandaler(item?.label, false)}
                        </ListItemIcon>
                        <ListItemText
                            style={{
                                color: "white",
                            }}
                            primary={item?.label}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
