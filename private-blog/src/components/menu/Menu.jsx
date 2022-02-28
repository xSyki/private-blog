import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../../services/appApi';

const Menu = () => {

    const { user } = useSelector((state) => state.user);
    const [logoutUser, { isLoading }] = useLogoutUserMutation()

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <>
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/"> <a><li>Home</li></a> </Link>
                        <Link to="/blog"><a><li>Blogs</li></a> </Link>
                        {user ? <a className='navigation__log'><li onClick={handleLogout}>Logout</li></a> : <Link to="/login"><a className='navigation__log'><li>Sign in</li></a> </Link>}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Menu;
