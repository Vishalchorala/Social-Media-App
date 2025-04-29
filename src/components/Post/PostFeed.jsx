import React from "react";
import PostItem from "./PostItem";
import { useOutletContext } from "react-router-dom";

const PostFeed = ({ posts }) => {
    const { toggleLike } = useOutletContext()
    return (
        <div>
            {posts.map((post, index) => (
                <PostItem key={post.id || index} post={post} toggleLike={toggleLike} />
            ))}
        </div>
    );
};

export default PostFeed;