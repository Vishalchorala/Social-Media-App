import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MdDelete, MdMoreVert } from "react-icons/md";
import { useOutletContext } from 'react-router-dom';
import { auth } from '../../firebase';
import { motion } from 'framer-motion'; // Import Framer Motion

const CommentCards = ({ comment, postId }) => {

    const { deleteComments } = useOutletContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);

    const [isDeleted, setIsDeleted] = useState(false); // Track if comment is deleted

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({ email: currentUser.email });
        }
    }, []);

    const handleDelete = () => {
        setIsDeleted(true); // Mark as deleted
        setTimeout(() => {
            deleteComments(comment.id, postId); // Delete after animation
        }, 300); // Wait for animation to finish
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: isDeleted ? 0 : 1, y: isDeleted ? -20 : 0 }} // Animate the deletion
                exit={{ opacity: 0, y: -20 }} // Exit animation
                transition={{ duration: 0.3 }}
                className="p-1.5 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md"
            >
                <div className="flex items-center justify-between ">
                    <div className='flex items-center gap-1'>
                        <div className="w-7.5 rounded-full bg-gray-300 text-center" >
                            <AccountCircleIcon sx={{ fontSize: 25 }} />
                        </div>
                        <div className="text-sm font-semibold">
                            {/* {comment.user} */}
                            {user?.email?.split("@")[0]}
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            title="Options"
                        >
                            <MdMoreVert className="text-2xl" />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 p-0 mt-2 w-22 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <button
                                    onClick={handleDelete} // Call handleDelete on click
                                    className="flex items-center w-full font-medium px-3 py-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                >
                                    <MdDelete className="mr-2 text-lg" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="mt-0.5 text-gray-800">{comment.text}</p>
                <div className="text-gray-500 text-xs mt-0.5">{comment.createdAt}</div>
            </motion.div>
        </>
    );
}

export default CommentCards;
