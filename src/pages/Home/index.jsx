import React, { useState } from 'react'
import PostFeed from '../../components/Post/PostFeed'
import { paths } from '../../constant/Paths'
import { NavLink, useOutletContext } from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6";
import { Pagination, PaginationItem } from '@mui/material';

import { motion } from 'framer-motion';

const Home = () => {
    const { posts } = useOutletContext()
    const [page, setPage] = useState(1);

    const postsPerPage = 3;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const visiblePosts = posts.slice(
        (page - 1) * postsPerPage,
        page * postsPerPage
    );

    const goToPage = (event, pageNum) => {
        setPage(pageNum);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <section className='max-w-6xl flex flex-col justify-center h-full w-full mx-auto px-2 sm:px-4 lg:px-5'>
                {posts.length === 0 ? (
                    <div className="flex flex-col h-full items-center mx-6 justify-center text-center ">
                        <motion.p
                            className="text-xl font-bold"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-[#040174] sm:text-2xl font-bold">
                                N<span className='text-[#ffc104]'>o</span> p<span className='text-[#ffc104]'>o</span>sts yet. Be the first t<span className='text-[#ffc104]'>o</span> share s<span className='text-[#ffc104]'>o</span>mething!
                            </p>
                        </motion.p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className='flex flex-col h-full justify-between'
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <PostFeed posts={visiblePosts} />
                        </motion.div>

                        {posts.length > postsPerPage && (
                            <motion.div
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0 mx-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={goToPage}
                                        siblingCount={1}
                                        boundaryCount={1}
                                        shape="rounded"
                                        size="large"
                                        renderItem={(item) => (
                                            <PaginationItem
                                                {...item}
                                                sx={{
                                                    background:
                                                        item.page === page
                                                            ? "linear-gradient(to right, #ff6f61, #fe9a8b)"
                                                            : "#f3f4f6",
                                                    color: item.page === page ? "#ffffff" : "#6B7280",
                                                    fontWeight: "bold",
                                                    borderRadius: "0.5rem",
                                                    "&:hover": {
                                                        background:
                                                            item.page === page
                                                                ? "linear-gradient(to right, #ff6f61, #fe9a8b)"
                                                                : "#e5e7eb",
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="text-right w-full sm:w-auto">
                                    <span className="text-gray-600 font-medium">
                                        Page {page} of {totalPages}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}

                <motion.div
                    className='flex justify-center mb-2'
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.button
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <NavLink to={paths.PostPage} className='mx-auto w-50 text-center block px-4 py-2 my-4 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-[#ffc104] to-[#ff4e7b] text-white shadow-md'>
                            <FaCirclePlus className='inline w-5 h-5 mr-2' />
                            Create New Post
                        </NavLink>
                    </motion.button>
                </motion.div>
            </section>
        </>
    )
}

export default Home
