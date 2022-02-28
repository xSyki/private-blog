import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllPostsMutation } from '../../services/appApi';
import BlogPost from '../blog-post/BlogPost';

const Blogs = () => {

    const urlParams = useParams();

    const [blogPosts, setBlogPosts] = useState();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const [getAllPosts, { data: posts, isLoading, isError }] = useGetAllPostsMutation();

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

        getAllPosts();
    }
        , [])

    useEffect(() => {
        setBlogPosts(posts);
    }, [posts])

    const handleStartDate = (event) => {
        setStartDate(event.target.value);
        if (new Date(event.target.value).getTime() > new Date(endDate).getTime()) {
            setEndDate(event.target.value);
            const newBlogPosts = posts.filter(post => new Date(post.created_at).getTime() >= new Date(event.target.value).getTime());
            setBlogPosts(newBlogPosts.filter(post => new Date(post.created_at).getTime() <= new Date(event.target.value).getTime() + 24 * 60 * 60 * 1000));
            return;
        } else {
            const newBlogPosts = posts.filter(post => new Date(post.created_at).getTime() >= new Date(event.target.value).getTime());
            setBlogPosts(newBlogPosts.filter(post => new Date(post.created_at).getTime() <= new Date(endDate).getTime() + 24 * 60 * 60 * 1000));
        }
    }

    const handleEndDate = (event) => {
        setEndDate(event.target.value);
        if (new Date(event.target.value).getTime() < new Date(startDate).getTime()) {
            setStartDate(event.target.value);
            const newBlogPosts = posts.filter(post => new Date(post.created_at).getTime() >= new Date(event.target.value).getTime());
            setBlogPosts(newBlogPosts.filter(post => new Date(post.created_at).getTime() <= new Date(event.target.value).getTime()));
            return;
        }
        const newBlogPosts = posts.filter(post => new Date(post.created_at).getTime() >= new Date(startDate).getTime());
        setBlogPosts(newBlogPosts.filter(post => new Date(post.created_at).getTime() <= new Date(event.target.value).getTime()));
    }

    const [searchInputValue, setSearchInputValue] = useState('');

    const handleSearchBar = (event) => {
        setSearchInputValue(event.target.value);
    }

    const handleSearchSubmit = () => {
        navigate(`/blog/${searchInputValue}`)
    }

    const deletePost = (id) => {
        setBlogPosts(blogPosts.filter(post => post._id !== id));
    }

    useEffect(() => {
        if (!posts) return;
        setBlogPosts(posts.filter(post => post.content.includes(searchInputValue)));
    }, [searchInputValue])

    const blogPostsRender = () => {
        if (isLoading) {
            return;
        };
        if (isError) {
            return (
                <div>
                    <h1>Error!</h1>
                </div>
            )
        };
        if (!blogPosts) return;
        return (
            blogPosts.map(blogPost => {
                return (
                    <BlogPost blogPost={blogPost} key={blogPost._id} getAllPosts={getAllPosts} deletePost={deletePost} />
                )
            })
        )
    }

    return (
        <>
            <div className='options'>
                <label className='options__search-bar'>
                    <button onClick={handleSearchSubmit} className="options__searchButton"><FaSearch /></button>

                    <input type="text" className='options__text-input' value={searchInputValue} onChange={handleSearchBar} />
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
