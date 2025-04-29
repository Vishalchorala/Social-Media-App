import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import PrivateRoute from "../../route/private-route";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";

const MainLayout = () => {
    const [posts, setPosts] = useState([]);

    // Load posts from localStorage on mount
    useEffect(() => {
        const storedPosts = localStorage.getItem("socialHop_posts");
        if (storedPosts) {
            console.log("storedPosts", storedPosts);

            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    // Add new post
    const addPost = (newPost) => {
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
    };

    // Toggle like for a post
    const toggleLike = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId
                ? {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                }
                : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
    };

    // Add a comment to a post
    const addComment = (postId, newComment) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId
                ? {
                    ...post,
                    comments: [...(post.comments || []), newComment],
                }
                : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
    };

    // Delete a post
    const deletePost = (postId) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
        toast.success("Post Deleted Successfully", {
            autoClose: 2000
        })
    };

    //Delete a Comments
    const deleteComments = (commentId, postId) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.filter((c) => c.id !== commentId)
                };
            }
            return post;
        });
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
        toast.success("Comment Deleted Successfully", {
            autoClose: 2000
        })
    }

    const editPostCaption = (postId, newCaption) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, caption: newCaption } : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("socialHop_posts", JSON.stringify(updatedPosts));
    };

    return (
        <>
            <div className="flex flex-col h-dvh">
                <Navbar />
                <PrivateRoute>
                    <ToastContainer />
                    <main className="flex-grow flex flex-col justify-center"  >
                        <Outlet
                            context={{ posts, addPost, toggleLike, addComment, deletePost, deleteComments, editPostCaption }}
                        />
                    </main>
                </PrivateRoute>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
