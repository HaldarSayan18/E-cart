// import { Box } from '@mui/material'
// import React from 'react'

// const Sidebar = () => {
//     return (
//         <div>
//             <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Dashoard</button>

//             <Box>
//                 <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
//                     <div class="offcanvas-header">
//                         <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                     </div>
//                     <div class="offcanvas-body">
//                         <p>Try scrolling the rest of the page to see this option in action.</p>
//                     </div>
//                 </div>
//             </Box>
//         </div>
//     )
// }

// export default Sidebar


import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
// import User from './User';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState();
    const icons = [
        <GridViewIcon />,
        <PermIdentityIcon />,
        <MessageOutlinedIcon />,
        <BookmarkBorderOutlinedIcon />,
        <FolderOpenOutlinedIcon />,
        <LeaderboardOutlinedIcon />,
        <LogoutIcon />
    ]
    const linkedItems = (text) => {
        // switch (text) {
        //     case 'Dashboard':
        //         return ("/");
        //     case 'User':
        //         return ("/user");    
        //     default:
        //         return ("/");
        // }
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer variant="permanent" open={open}  >
                <Toolbar style={{ backgroundColor: '#4723D9' }} />
                <List style={{ backgroundColor: "#4723D9", height: "100%" }}>
                    {['Dashboard', 'User', 'Messages', 'Bookmark', 'Files', 'Stats', 'Sign out'].map((text, index) => (
                        <ListItem key={text} className={activeTab === text ? "activeDash" : ""} disablePadding sx={{ display: 'block', marginBottom: '50px' }} onClick={() => setActiveTab(text)}>
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                        color: '#E9ECFA'
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <Link to={linkedItems(text)} style={{ display: "flex", textDecoration: "none", color: "white", alignItems: "center", justifyContent: "center", textAnchor: `${index[linkedItems]}` }}>
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                                color: '#E9ECFA'
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {icons[index]}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar style={{ marginRight: "100%" }}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 0,
                                color: '#E9ECFA'
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon style={{ color: '#4723D9', marginRight: "auto" }} />
                    </IconButton>
                    {open && <IconButton onClick={handleDrawerClose} >
                        <KeyboardBackspaceIcon style={{ color: '#4723D9', marginRight: "auto" }} />
                    </IconButton>}
                </Toolbar>
                {/* <Box style={{ marginRight: "80%" }}>
                    <h1> Main Components </h1>
                </Box> */}
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "5px", padding: "50px" }}>
                    <Avatar alt="Travis Howard" src="https://media.licdn.com/dms/image/D4D12AQEX8gtyshV0Mw/article-cover_image-shrink_720_1280/0/1692616311140?e=2147483647&v=beta&t=-zqCLG2NU9KHBhyiJu1briswMSu_2OmodOyqwlGYODU" height="60px" width="70px" style={{ borderRadius: "30%", height: "70px", width: "70px", cursor: "pointer" }} />
                </Box>
            </Box>
        </>
    );
}

export default Sidebar