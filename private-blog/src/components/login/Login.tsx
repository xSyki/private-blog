import React, { useState } from 'react';

const Login = () => {

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
                </form>
            </div>
        </>
    );
}

export default Login;
