import { Link, NavLink } from "react-router-dom";
import Logo from "./../../assets/navbar-logo.png";
import "./Navbar.css";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
    const { logOut, user } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logOut()
            .then(res => {
                console.log('logged out');
            })
            .catch(err => {
                console.log("error");
            })
    }

    const navLinks = <>
        <li>
            <NavLink to="/">
                <span>Home</span>
            </NavLink>
        </li>
        {
            user ? "" : <li>
                <NavLink to="/register">
                    <span>Register</span>
                </NavLink>
            </li>
        }
        {
            user ?
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                            <img className="w-[40px] rounded-full" src={user?.photoURL} alt="photo" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem sx={{ display: 'flex', flexDirection: 'column' }} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Md. A. Barik</Typography>
                        </MenuItem>
                        <MenuItem sx={{ display: 'flex', flexDirection: 'column' }} onClick={handleCloseUserMenu}>
                            <Button onClick={handleLogout}>Logout</Button>
                        </MenuItem>
                    </Menu>
                </Box> : ""
        }
    </>

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-white drop-shadow-2xl text-black">
                    <div className="flex items-center justify-between w-[1280px] mx-auto">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Link to="/" className="flex items-center gap-2">
                                    <img className="w-[50px]" src={Logo} alt="logo" />
                                    <span className="text-xl font-bold">TaskMaster Pro</span>
                                </Link>

                            </div>
                        </div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal text-[14px]">
                                {/* Navbar menu content here */}
                                {navLinks}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;





