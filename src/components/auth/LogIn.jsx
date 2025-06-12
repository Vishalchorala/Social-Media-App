import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify'; 
import { paths } from '../../constant/Paths';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
});

const LogIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState(false);

    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success("Login successful!...", {
                    autoClose: 2000,
                });
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        navigate(paths.home);
                    });
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error("Invalid email or password. Please try again.", {
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                className="bg-white p-5 md:p-8 rounded-xl md:rounded-4xl shadow-2xl w-full max-w-md"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    className='text-center mb-1 font-bold text-[#040174] text-2xl sm:text-3xl'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Welcome <span className='text-[#ff4e7b]'>Back</span> ! 👀
                </motion.h2>
                <motion.p
                    className='text-center mb-4 text-gray-600 text-md font-medium'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Log in to your account
                </motion.p>
                <motion.hr
                    className='mb-4 text-gray-300'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register('email')}
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight
                              focus:outline-none focus:ring-2 "
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </motion.div>

                    <motion.div
                        className="mb-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...register('password')}
                                onChange={(e) => {
                                    setPasswordValue(e.target.value);
                                }}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:ring-2 border-gray-300"
                            />
                            {passwordValue.length > 0 && (
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            )}
                        </div>
                        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="bg-[#050174dd] hover:bg-[#040174] text-white font-bold py-2 px-4 rounded transition-all duration-200 w-full cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Login
                    </motion.button>
                </form>

                <motion.p
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Don't have an account?{' '}
                    <NavLink to={paths.signUp} className="text-[#4741e7] hover:text-[#050174dd] font-bold transition-all duration-200">
                        Sign up
                    </NavLink>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LogIn;
