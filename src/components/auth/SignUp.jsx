import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { paths } from '../../constant/Paths'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from 'framer-motion';

const schema = yup.object({
    name: yup.string().min(4, "Name must be at least 4 characters").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match")
})

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                toast.success("✅ Signup successful! Redirecting to login...", {
                    autoClose: 2000,
                });
                setTimeout(() => {
                    navigate(paths.logIn);
                }, 2000);
            })
            .catch((error) => {
                console.error(error.code, error.message);
                if (error.code === "auth/email-already-in-use") {
                    toast.error(
                        "This email is already registered. Please log in instead.", {
                        autoClose: 2000,
                    });
                } else {
                    toast.error(`Signp failed: ${error.message}`, {
                        autoClose: 2000,
                    });
                }
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
                    className="text-xl sm:text-3xl font-bold sm:mb-1 text-center text-[#040174]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Welcome to the Socialh<span className='text-[#ffc104]'>o</span>p
                </motion.h2>
                <motion.p
                    className='text-center mb-1 sm:mb-3 text-gray-600 text-md font-medium'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Sign up to your account
                </motion.p>
                <motion.hr
                    className='mb-4 text-gray-300'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <label className="block text-gray-700 text-xs sm:text-sm font-bold sm:mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            {...register('name')}
                            className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 border-gray-300 "
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                    </motion.div>

                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <label className="block text-gray-700 text-xs sm:text-sm font-bold sm:mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register('email')}
                            className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 border-gray-300"
                        />
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email?.message}</p>
                    </motion.div>

                    <motion.div
                        className="mb-3 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <label className="block text-gray-700 text-xs sm:text-sm font-bold sm:mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...register('password')}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-1 border-gray-300"
                        />
                        {passwordValue.length > 0 && (
                            <div
                                className="absolute right-3 top-6 sm:top-9 text-gray-600 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        )}
                        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                    </motion.div>

                    <motion.div
                        className="mb-3 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                    >
                        <label className="block text-gray-700 text-xs sm:text-sm font-bold sm:mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            {...register('confirmPassword')}
                            onChange={(e) => setConfirmPasswordValue(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-1 border-gray-300"
                        />
                        {confirmPasswordValue.length > 0 && (
                            <div
                                className="absolute right-3 top-6 sm:top-9 text-gray-600 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        )}
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="bg-[#050174dd] hover:bg-[#040174] text-white font-bold py-2 px-4 rounded transition-all duration-200 w-full cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Sign up
                    </motion.button>
                </form>

                <motion.p
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Already have an account?{' '}
                    <NavLink to={paths.logIn} className="text-[#4741e7] hover:text-[#050174dd] font-bold transition-all duration-200">
                        Log in
                    </NavLink>
                </motion.p>
            </motion.div>
        </div>
    )
}

export default SignUp;
