import React, { useEffect, useState } from 'react';
import { FaPhotoVideo, FaMicrophone } from 'react-icons/fa';

const BlogForm = () => {

    const [content, setContent] = useState("");
    const [letterLength, setLetterLenght] = useState(0);

    const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    const handlePost = () => {
        setContent('');
    }

    useEffect(() => {
        setLetterLenght(Array.from(content).length);

    }, [content])

    return (
        <>
            <div className='app__blog-form blog-form'>
                <div className='blog-form__content'>
                    <textarea className='blog-form__content-input' placeholder="What's happend?" maxLength={250} value={content} onChange={handleContent} />
                    <p className='blog-form__content-letter-lenght'>{`${letterLength}/250`}</p>
                </div>
                <div className='blog-form__options'>
                    <div className='blog-form__attachments'>
                        <button className='blog-form__photo'>
                            <FaPhotoVideo />
                        </button>
                        <button className='blog-form__audio'>
                            <FaMicrophone />
                        </button>
                    </div>
                    <button className='blog-form__submit-button' type='submit' onClick={handlePost}>Post</button>
                </div>
            </div>
        </>
    );
}

export default BlogForm;
