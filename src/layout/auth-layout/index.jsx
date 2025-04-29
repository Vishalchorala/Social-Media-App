import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion';
import logo from '/src/assets/logo1.png';
import GuestRoute from '../../route/guest-Route/GuestRoute';

const AuthLayout = () => {
    return (
        <GuestRoute>
            <section className='bg-gradient-to-r from-[#888888] to-[#252525] h-dvh flex items-center justify-center p-3'>
                <div className='w-full max-w-6xl'>
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-2 bg-[#e2e2e2] rounded-md md:rounded-2xl p-4  md:p-10 md:gap-6'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className='flex justify-center items-center'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src={logo} alt="Logo" className='w-45 md:w-120' />
                        </motion.div>


                        <Outlet />
                    </motion.div>
                </div>
            </section>
        </GuestRoute>
    )
}

export default AuthLayout;
