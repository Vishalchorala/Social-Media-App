import React from 'react'
import PostForm from '../../components/Post/PostForm'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { paths } from '../../constant/Paths'

const PostPage = () => {

    const Navigate = useNavigate();
    const { addPost } = useOutletContext();

    const handlePostSubmit = (newPost) => {
        addPost(newPost)
        Navigate(paths.home)
    }
    return (
        <div>
            <PostForm addPost={handlePostSubmit} />
        </div>
    )
}

export default PostPage