import React from 'react';
import './css/style.css';
import Login from './components/login/Login'
import BlogForm from './components/blog-form/BlogForm';

function App() {
  return (
    <>
      <div className='app'>
        {/* <Login /> */}
        <BlogForm />
      </div>
    </>
  );
}

export default App;
