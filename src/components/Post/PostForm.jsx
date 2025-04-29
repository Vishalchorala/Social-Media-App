import React, { useState } from "react";
import { ImagePlus, Send, FileText, Hash } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            when: "beforeChildren",
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const PostForm = ({ addPost }) => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [hashtags, setHashtags] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!caption.trim()) {
            toast.error("Caption can not be empty!", {
                autoClose: 2000,
            });
            return;
        }

        const newPost = {
            caption,
            image,
            hashtags: hashtags.split(",").map((tag) => tag.trim()),
            createdAt: new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }),
            id: Date.now(),
            likes: 0,
            liked: false,
            Comments: [],
        };

        addPost(newPost);
        toast.success("Post Created Successfully", {
            autoClose: 2000,
        });
        setCaption("");
        setImage(null);
        setHashtags("");
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <div className="max-w-3xl mx-auto">
                <motion.h1
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mx-4 my-5 font-bold text-2xl sm:text-4xl text-[#040174]"
                >
                    Create New P
                    <span className="text-[#ffc104] text-2xl sm:text-4xl">o</span>st ✍️
                </motion.h1>

                <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className="space-y-5 mx-5 p-5 border border-gray-300 bg-gray-100 rounded-lg"
                >
                    <motion.div variants={itemVariants}>
                        <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#040174]" />
                            Caption
                        </label>
                        <textarea
                            rows={3}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write something amazing..."
                            className="w-full border bg-white border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#ffc104]"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
                            <ImagePlus className="w-5 h-5 text-[#040174]" />
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="inline w-55 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-700 hover:file:bg-blue-300 transition duration-200"
                        />
                        {image && (
                            <img
                                src={image}
                                alt="Preview"
                                className="mt-4 rounded-lg w-full max-h-64 object-cover"
                            />
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
                            <Hash className="w-5 h-5 text-[#040174]" />
                            Hashtags
                        </label>
                        <input
                            type="text"
                            value={hashtags}
                            onChange={(e) => setHashtags(e.target.value)}
                            placeholder="#fun, #coding, #react"
                            className="w-full border bg-white border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#ff4e7b]"
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={itemVariants}
                        whileTap={{ scale: 0.90 }}
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffc104] to-[#ff4e7b] text-white shadow-md hover:bg-blue-700 font-medium py-3 rounded-xl transition cursor-pointer"
                    >
                        <Send className="w-5 h-5" />
                        Post Now
                    </motion.button>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default PostForm;
