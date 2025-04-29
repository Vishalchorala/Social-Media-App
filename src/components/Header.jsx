import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import AddIcon from '@mui/icons-material/Add';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { paths } from "../constant/Paths";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // 👉 added AnimatePresence for smooth popup

const Navbar = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // 👉 for confirmation modal

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, [auth]);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

    const handleLogoutConfirm = () => {
        setShowLogoutConfirm(false);
        signOut(auth)
            .then(() => {
                setUserMenuOpen(false);
                setMenuOpen(false);
                toast.success("Sign out successful!", { autoClose: 2000 });
                setTimeout(() => {
                    navigate(paths.logIn);
                }, 2000);
            })
            .catch((error) => {
                console.error("Logout error:", error);
                toast.error("Sign out failed. Please try again.", { autoClose: 2000 });
            });
    };

    const navLinkClass = ({ isActive }) => `
        block px-4 py-2 rounded-md font-medium transition-all duration-200 
        ${isActive
            ? "bg-gradient-to-r from-[#ffc104] to-[#ff4e7b] text-white shadow-md"
            : "text-[#040174] hover:bg-[#ffe5ec] hover:shadow-md hover:-translate-y-0.5"
        }`;

    const mobileNavLinkClass = ({ isActive }) => `
        block px-2 py-0.5 text-sm rounded-md font-medium transition-all duration-200 
        ${isActive
            ? "bg-gradient-to-r from-[#ffc104] to-[#ff4e7b] text-white shadow-md"
            : "text-[#040174] hover:bg-[#ffe5ec] hover:shadow-md hover:-translate-y-0.5"
        }`;

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-10 mb-2">
            <div className="max-w-6xl mx-auto px-5 py-2 flex justify-between items-center">
                <NavLink to={paths.home} className="sm:text-3xl font-bold mb-1 text-center text-[#040174]">
                    Socialh<span className='text-[#ffc104] sm:text-3xl'>o</span>p 👀
                    <hr className="text-gray-300 mt-1" />
                </NavLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 relative">
                    <NavLink to={paths.home} className={navLinkClass}>Home</NavLink>
                    <NavLink to={paths.PostPage} className={navLinkClass}>
                        <AddIcon />
                        Create Post
                    </NavLink>

                    <div className="relative flex items-center">
                        <button
                            onClick={toggleUserMenu}
                            className="text-3xl text-[#1d3557] focus:outline-none hover:text-[#d78a26] transition-all cursor-pointer"
                        >
                            <AccountCircleIcon fontSize="inherit" className="mb-1" />
                        </button>
                        {userMenuOpen && (
                            <div className="absolute right-1 mt-30 w-40 bg-gray-100 border border-neutral-300 rounded shadow-lg z-20">
                                {isLoggedIn && (
                                    <NavLink
                                        to={paths.profie}
                                        className="block px-4 py-2 font-medium text-sm text-[#1d3557] hover:bg-[#f1f1f1]"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <Person2Icon fontSize="8" className="mr-1 mb-1" />
                                        Profile
                                    </NavLink>
                                )}
                                <button
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="block w-full text-left px-4 py-2 font-medium text-sm text-[#1d3557] hover:bg-[#f1f1f1]"
                                >
                                    <LogoutIcon fontSize="5" className="mr-1 mb-1" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hamburger for Mobile */}
                <button onClick={toggleMenu} className="md:hidden text-[#1d3557] font-bold sm:text-xl">
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border bg-[#e9ebf2] border-gray-300 mx-auto w-[92%] absolute right-0 left-0 m-3 rounded-xl pt-2 px-4 pb-2 space-y-0 text-start shadow-xl">
                    <NavLink
                        to={paths.home}
                        onClick={() => setMenuOpen(false)}
                        className={mobileNavLinkClass}
                    >
                        <HomeIcon className="mb-1 mr-1" />
                        Home
                    </NavLink>
                    <NavLink
                        to={paths.PostPage}
                        onClick={() => setMenuOpen(false)}
                        className={mobileNavLinkClass}
                    >
                        <AddIcon className="mb-1 mr-1" />
                        Create Post
                    </NavLink>
                    <NavLink
                        to={paths.profie}
                        className={mobileNavLinkClass}
                        onClick={() => {
                            setUserMenuOpen(false);
                            setMenuOpen(false);
                        }}
                    >
                        <Person2Icon className="mr-1 mb-1" />
                        Profile
                    </NavLink>
                </div>
            )}

            {/* 🔥 Logout Confirm Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#22222248] backdrop-blur-sm flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Confirm Logout</h2>
                            <p className="text-gray-600 mb-6 text-center">Are you sure you want to logout?</p>
                            <div className="flex justify-center gap-4">
                                <motion.button
                                    onClick={handleLogoutConfirm}
                                    className="px-4 py-2 bg-[#050174dd] hover:bg-[#040174] text-white rounded-lg font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Yes, Logout
                                </motion.button>
                                <motion.button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
