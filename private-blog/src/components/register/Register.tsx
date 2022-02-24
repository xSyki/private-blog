import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        axios.post('http://localhost:3000/users', { login, password })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
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
