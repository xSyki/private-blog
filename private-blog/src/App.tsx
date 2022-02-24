import React from 'react';
import './css/style.css';
import Menu from './components/menu/Menu'
import Login from './components/login/Login'
import BlogForm from './components/blog-form/BlogForm';
import Blogs from './components/blogs/Blogs';
import { Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';

function App() {
  return (
    <>
      <div className='app'>
        {/* <Login /> */}
        <Menu />
        <Routes>
          <Route path='/' element={<BlogForm />} />
          <Route path='/blog' element={<Blogs />} >
            <Route path=":searchParam" element={<Blogs />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
