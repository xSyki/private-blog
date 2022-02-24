import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

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
                        <Link to="/login"><a><li>Sign in</li></a> </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Menu;
