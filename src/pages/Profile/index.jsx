import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../constant/Paths';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({
                name: currentUser.displayName || 'UserName',
                email: currentUser.email,
                photoURL: currentUser.photoURL || 'default-avatar.png',
            });
        } else {
            navigate(paths.logIn);
        }
    }, [navigate]);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            navigate(paths.logIn);
        } catch (error) {
            console.error('Error signing out:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmLogout = () => {
        setShowConfirm(false);
        handleSignOut();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.5 }}
            className="flex flex-col justify-center items-center mx-5 text-center"
        >
            <motion.div
                className="bg-white p-5 md:p-8 rounded-xl md:rounded-4xl shadow-2xl w-full max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
            >
                <motion.h2
                    className="sm:text-3xl font-bold mb-3 text-center text-[#040174]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Profile Page
                </motion.h2>

                <motion.div
                    className="bg-gray-100 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <motion.div
                        className="flex justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        whileHover={{
                            rotate: [0, 5, -5, 0],
                            transition: { duration: 0.6 },
                        }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 70 }} />
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-gray-700 sm:text-2xl">{user?.name}</h3>
                        <p className="text-gray-500">{user?.email}</p>
                    </motion.div>

                    <motion.button
                        onClick={() => setShowConfirm(true)}
                        className={`mt-6 w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#050174dd] hover:bg-[#040174]'} text-white font-bold py-2 px-4 rounded transition-all duration-200`}
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.03 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {loading ? 'Signing out...' : 'Sign Out'}
                    </motion.button>
                </motion.div>
            </motion.div>

            {showConfirm && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[#22222248] bg-opacity-30 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                                Confirm Logout
                            </h3>
                            <p className="text-gray-600 mb-6 text-center">
                                Are you sure you want to log out?
                            </p>
                            <div className="flex justify-center gap-4">
                                <motion.button
                                    onClick={handleConfirmLogout}
                                    className="px-4 py-2 bg-[#050174dd] hover:bg-[#040174] text-white rounded-lg font-semibold cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Yes, Log Out
                                </motion.button>
                                <motion.button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default Profile;
