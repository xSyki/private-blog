import React, { useEffect, useState } from 'react';
import { FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import testBlogPosts from './test-blog-posts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blogs = () => {

    const urlParams = useParams();
    console.log(urlParams);

    const [blogPosts, setBlogPosts] = useState(testBlogPosts);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    if (!user) {
        navigate("/login")
    }

    useEffect(() => {
        const nowDate = new Date();
        setEndDate(String(nowDate.toISOString()).substring(0, 10))
        const defaultOffset = (24 * 60 * 60 * 1000) * 7;
        const endDateWithOffset = nowDate.setTime(nowDate.getTime() - defaultOffset);
        const endDateGot = new Date(endDateWithOffset);
        setStartDate(String(endDateGot.toISOString()).substring(0, 10));

        urlParams.searchParam && setSearchInputValue(urlParams.searchParam);
    }
        , [])

    const handleStartDate = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDate = (event) => {
        setEndDate(event.target.value)
    }

    const handleEditBlog = (id) => {
        console.log(`Edit ${id}`);
    }
    const handleDeleteBlog = (id) => {
        console.log(`Delete ${id}`);
    }

    const [searchInputValue, setSearchInputValue] = useState('');

    const handleSearchBar = (event) => {
        setSearchInputValue(event.target.value);
    }

    const blogPostsRender = () => {
        return (
            blogPosts.map(blogPost => {
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
                    <input type="text" className='options__text-input' value={searchInputValue} onChange={(event) => handleSearchBar} />
                </label>
                <div className='options__date-picker'>
                    <input type="date" className='options__date-input' value={startDate} onChange={(event) => handleStartDate(event)} />
                    <input type="date" className='options__date-input' value={endDate} onChange={handleEndDate} />
                </div>
            </div>
            <div className='blog-posts'>
                {blogPostsRender()}
            </div>
        </>
    );
}

export default Blogs;
