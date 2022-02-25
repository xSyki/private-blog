import React from 'react';
import './css/style.css';
import Menu from './components/menu/Menu'
import Login from './components/login/Login'
import BlogForm from './components/blog-form/BlogForm';
import Blogs from './components/blogs/Blogs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/register/Register';
import { useSelector } from 'react-redux';
import PageNotFound from './components/page-not-found/PageNotFound';

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className='app'>
        {user && <Menu />}
        <Routes>
          <Route path='/' element={<BlogForm />} />
          <Route path='/blog' element={<Blogs />} >
            <Route path=":searchParam" element={<Blogs />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
