import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLoginUserMutation } from '../../services/appApi';
import { useSelector } from 'react-redux';

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, data }] = useLoginUserMutation();

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/")
        }

    }, [])

    const handleLogin = (event) => {
        setLogin(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser({ login, password });
    }

    if (user) {
        navigate("/")
    }

    return (
        <>
            <div className='app__login login'>
                <h1 className='login__title'>Login</h1>
                <form action="" className='login__form'>
                    <input className='login__login-input' type="text" placeholder="Login" value={login} onChange={handleLogin} />
                    <input className='login__password-input' type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <button className='login__submit-button' type='submit' onClick={handleSubmit}>
                        Login
                    </button>
                    <p className='login__sub-text'>Don't have an Account? <Link to="/register">Register!</Link></p>
                </form>
            </div>
        </>
    );
}

export default Login;
