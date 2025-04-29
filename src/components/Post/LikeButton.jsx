import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const LikeButton = ({ post }) => {
    const { liked, likes } = post;
    const { toggleLike } = useOutletContext();

    // State for controlling the "like popup"
    const [showHeart, setShowHeart] = useState(false);

    const handleLikeClick = () => {
        toggleLike(post.id);
        setShowHeart(true);

        // Hide the popup after the animation completes
        setTimeout(() => {
            setShowHeart(false);
        }, 500); // duration of the animation
    };

    return (
        <div className="flex items-center space-x-2 text-sm">
            {/* Like button */}
            <motion.button
                onClick={handleLikeClick}
                className={`transition-transform duration-200 cursor-pointer ${liked ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-400"}`}
                whileTap={{ scale: 0.9 }} // Slightly scale down when clicked
                whileHover={{ scale: 1.1 }} // Scale up slightly when hovered
                transition={{ duration: 0.2 }}
            >
                {liked ? "❤️" : "🤍"}
            </motion.button>

            {/* "Popup Heart" animation */}
            {showHeart && (
                <motion.div
                    className="absolute text-red-500"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    transition={{
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.5, ease: "easeOut" },
                    }}
                >
                    ❤️
                </motion.div>
            )}

            {/* Likes count */}
            <span className="text-gray-600 font-medium">
                {likes} {likes === 1 ? "like" : "likes"}
            </span>
        </div>
    );
};

export default LikeButton;
