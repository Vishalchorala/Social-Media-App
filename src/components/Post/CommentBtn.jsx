import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CommentCards from "./CommentCards";

const CommentBtn = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const { addComment } = useOutletContext();

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim() !== "") {
      const newComment = {
        text: commentText,
        createdAt: new Date().toLocaleString(),
        id: Date.now(),
        user: "Username",
      };

      addComment(post?.id, newComment);
      setCommentText("");
    }
  };

  return (
    <div className="mt-4 space-y-2">
            <h3 className='mx-3 text-black text-md font-medium'>Comments :</h3>
      <div className="space-y-2">
        {post?.comments &&
          post?.comments.length > 0 &&
          post?.comments.map((comment) => (
            <CommentCards key={comment.id} comment={comment} postId={post.id} />
          ))}
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="mt-4 flex items-center space-x-2"
      >
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border-gray-300 bg-white px-2 text-xs p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc104]"
        />

        <button type="submit" className="text-center block px-4 py-1.5 rounded-md font-medium transition-all duration-200 bg-gradient-to-r from-[#ffc104] to-[#ff4e7b] text-white shadow-md hover:bg-blue-600 cursor-pointer text-xs">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentBtn;