import React, { useEffect, useState } from "react";
import { MdPerson, MdDelete, MdMoreVert, MdEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import LikeButton from "./LikeButton";
import CommentBtn from "./CommentBtn";
import { auth } from "../../firebase";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion

const PostItem = ({ post }) => {
    const { toggleLike, deletePost, editPostCaption } = useOutletContext();
    const [showDropdown, setShowDropdown] = useState(false);

    const [showComments, setShowComments] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedCaption, setEditedCaption] = useState(post.caption);

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleDelete = () => {
        deletePost(post.id);
        setShowDropdown(false);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({ email: currentUser.email });
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setShowDropdown(false);
    };

    const handleSave = () => {
        editPostCaption(post.id, editedCaption);
        setIsEditing(false);
        toast.success("Post edited successfully!", { autoClose: 2000 });
    };

    return (
        <>
            <div className="p-5 bg-white rounded-2xl shadow-2xl space-y-3 sm:space-y-4 m-2 sm:m-1 border border-gray-200 transition-all hover:shadow-3xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 shadow-inner mr-1">
                            <MdPerson className="text-white text-2xl" />
                        </div>
                        <div className="text-base font-bold text-gray-800">{user?.email?.split("@")[0]}
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={handleDropdownToggle}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            title="Options"
                        >
                            <MdMoreVert className="text-2xl" />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-0 w-28 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center w-full px-3 py-2 text-sm text-blue-500 hover:bg-blue-50 hover:text-blue-700 cursor-pointer "
                                >
                                    <MdEdit className="mr-2 text-lg" />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                >
                                    <MdDelete className="mr-2 text-lg" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div>
                        <textarea
                            value={editedCaption}
                            onChange={(e) => setEditedCaption(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            rows="4"
                        />
                        <div className="mt-2 flex justify-end space-x-3">
                            <button
                                onClick={handleSave}
                                className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-sm hover:shadow-md hover:opacity-90 cursor-pointer"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-1.5 bg-gray-200 text-black rounded-md hover:shadow-sm hover:bg-gray-300  cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-800 text-lg font-bold ml-0.5">{post.caption}</p>
                )}


                {post.image && (
                    <img
                        src={post.image}
                        alt="Post Image"
                        className="w-full h-auto rounded-lg object-cover border border-gray-100"
                    />
                )}
                <p className="text-blue-600 font-medium text-sm ml-0.5">{post.hashtags}</p>
                <div className="text-gray-400 text-xs">{post.createdAt}</div>

                {/* <LikeButton post={post} toggleLike={toggleLike} />
            <CommentBtn post={post} /> */}
                <div className="flex items-center space-x-5 ">
                    <LikeButton post={post} toggleLike={toggleLike} />

                    <button
                        onClick={() => setShowComments((prev) => !prev)}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <FaRegComment className="text-md cursor-pointer" />
                        <span className="ml-2 text-sm text-gray-500">
                            {post.comments ? post.comments.length : 0}
                        </span>
                    </button>
                </div>


                {showComments && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 25,
                            duration: 0.5,
                        }}
                    >
                        <div className="mt-4">
                            <CommentBtn post={post} />
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default PostItem;