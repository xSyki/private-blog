import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../../services/appApi';
import { useSelector } from 'react-redux';

const Register = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [signupUser, { isLoading, data }] = useSignupUserMutation();

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
        signupUser({ login, password });
    }

    if (user) {
        navigate("/")
    }

    return (
        <>
            <div className='app__login login'>
                <h1 className='login__title'>Register</h1>
                <form action="" className='login__form'>
                    <input className='login__login-input' type="text" placeholder="Login" value={login} onChange={handleLogin} />
                    <input className='login__password-input' type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <button className='login__submit-button' type='submit' onClick={handleSubmit}>
                        Register
                    </button>
                    <p className='login__sub-text'>Have an Account? <Link to="/login">Login!</Link></p>
                </form>
            </div>
        </>
    );
}

export default Register;
