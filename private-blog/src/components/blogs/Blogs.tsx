import React, { useState } from 'react';
import { FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import testBlogPosts from './test-blog-posts';

const Blogs = () => {

    const blogPosts = useState(testBlogPosts);

    const handleEditBlog = (id: number) => {
        console.log(`Edit ${id}`);
    }
    const handleDeleteBlog = (id: number) => {
        console.log(`Delete ${id}`);
    }

    const blogPostsRender = () => {
        return (
            blogPosts[0].map(blogPost => {
                return (
                    <>
                        <div className='blog-posts__post blog-post' key={blogPost.id}>
                            <div className='blog-post__date'>{blogPost.date}</div>
                            <div className='blog-post__controls'><button className='blog-post__edit' onClick={() => handleEditBlog(blogPost.id)}><FaEdit /></button> <button className='blog-post__delete' onClick={() => handleDeleteBlog(blogPost.id)}><FaTimes /></button></div>
                            {blogPost.content && <div className='blog-post__content'>{blogPost.content}</div>}
                            {blogPost.audio && <audio controls className='blog-post__audio'><source src={blogPost.audio} type="audio/mpeg" /></audio>}
                            {blogPost.photo && <img src={blogPost.photo} className='blog-post__photo' />}
                        </div>
                    </>
                )
            })
        )
    }

    return (
        <>
            <div className='options'>
                <label className='options__search-bar'>
                    <FaSearch />
                    <input type="text" className='options__text-input' />
                </label>
                <div className='options__date-picker'>
                    <input type="date" className='options__date-input' />
                    <input type="date" className='options__date-input' />
                </div>
            </div>
            <div className='blog-posts'>
                {blogPostsRender()}
            </div>
        </>
    );
}

export default Blogs;
