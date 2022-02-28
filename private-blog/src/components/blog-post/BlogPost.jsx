import React, { useEffect, useState } from 'react';
import { FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import { useDeletePostMutation, useEditPostMutation } from '../../services/appApi';

const BlogPost = (props) => {
    const blogPost = props.blogPost;
    const getAllPosts = props.getAllPosts;

    const [content, setContent] = useState(blogPost.content);
    const [isEditing, setIsEditing] = useState(false);

    const [letterLength, setLetterLenght] = useState(Array.from(blogPost.content).length);

    const [deletePost, { isLoading, data }] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();

    const date = new Date(blogPost.created_at).toLocaleDateString();

    const handleEditBlog = (id) => {
        setIsEditing(true);
    }
    const handleDeleteBlog = (id) => {
        deletePost({ id });
        props.deletePost(id);
    }

    const handleEditInput = (event) => {
        setContent(event.target.value);
        setLetterLenght(Array.from(content).length);
    }

    const handlePost = (id, content) => {
        setIsEditing(false);
        if (content === blogPost.content) return;
        editPost({ id, content });
    }

    return (
        <>
            <div className='blog-posts__post blog-post' key={blogPost._id}>
                <div className='blog-post__date'>{date}</div>
                <div className='blog-post__controls'>
                    <button className='blog-post__edit' onClick={() => handleEditBlog(blogPost._id)}>
                        <FaEdit />
                    </button>
                    <button className='blog-post__delete' onClick={() => handleDeleteBlog(blogPost._id)}>
                        <FaTimes />
                    </button>
                </div>
                {isEditing ?
                    <div className='blog-post__edit'>
                        <div className='blog-post__text-edit'>
                            <textarea className='blog-post__edit-input' type="text" maxLength={250} value={content} onChange={handleEditInput} />
                            <p className='blog-post__content-letter-lenght'>{`${letterLength}/250`}</p>
                        </div>
                        <button className='blog-post__submit-button' onClick={() => handlePost(blogPost._id, content)}>Post</button>
                    </div>
                    :
                    <div className='blog-post__content'>
                        {content}
                    </div>}
                {/* {blogPost.audio && <audio controls className='blog-post__audio'><source src={blogPost.audio} type="audio/mpeg" /></audio>} */}
                {blogPost.photo && <img src={blogPost.photo} className='blog-post__photo' />}
            </div>
        </>
    )
}

export default BlogPost;