import React, { useEffect, useState } from 'react';
import { FaPhotoVideo, FaMicrophone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../services/appApi';

const BlogForm = () => {

    const [content, setContent] = useState("");
    const [letterLength, setLetterLenght] = useState(0);

    const [photoClicked, setPhotoCliced] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photo, setPhoto] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false)

    // const [audioClicked, setAudioCliced] = useState(false);
    // const [audio, setAudio] = useState(null);
    // const [audioUrl, setAudioUrl] = useState('');

    const [createPost, { isLoading, data }] = useCreatePostMutation();

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    if (!user) {
        navigate("/login")
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    // const uploadPhoto = (e) => {
    //     e.preventDefault();
    //     if (!photo) return;
    //     setPhotoUrl('');
    //     const data = new FormData();
    //     data.append('file', photo);
    //     data.append('upload_preset', 'ezifnu8t');
    //     setUploadingPhoto(true);
    //     fetch('https://api.cloudinary.com/v1_1/dtnysbshs/image/upload', {
    //         method: 'POST',
    //         body: data
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setUploadingPhoto(false);
    //             setPhotoUrl(data.url);
    //         }).catch(err => {
    //             setUploadingPhoto(false);
    //             console.log(err);
    //         })
    // }

    const photoValidation = (e) => {
        const file = e.target.files[0];
        if (file.size > 1048576) {
            setPhotoUrl(null);
        } else {
            setPhotoUrl('');
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ezifnu8t');
            setUploadingPhoto(true);
            fetch('https://api.cloudinary.com/v1_1/dtnysbshs/image/upload', {
                method: 'POST',
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    setUploadingPhoto(false);
                    setPhotoUrl(data.url);
                }).catch(err => {
                    setUploadingPhoto(false);
                    console.log(err);
                })
        }
    }

    const handlePost = () => {
        if (!content) return;
        setContent('');
        setPhotoUrl('');
        setPhotoCliced(false);
        createPost({ content, photo: photoUrl, created_at: new Date().toISOString() }).then((error) => {
            if (error) {
                console.log(error)
            }
        })
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
                {photoUrl && <div>
                    <img src={photoUrl} className='blog-form__photo-output' />
                </div>}
                <div className='blog-form__options'>
                    <div className='blog-form__attachments'>
                        {!photoUrl && <button className='blog-form__photo' onClick={() => setPhotoCliced(!photoClicked)}>
                            <FaPhotoVideo />
                        </button>}
                        {/* <button className='blog-form__audio' onClick={() => setAudioCliced(!audioClicked)}>
                            <FaMicrophone />
                        </button> */}
                    </div>
                    <button className='blog-form__submit-button' type='submit' onClick={handlePost}>Post</button>
                </div>
                {photoClicked && <div className='blog-form__options-extra'>
                    {!photoUrl &&
                        <>
                            <label>
                                Photo:
                                <input type="file" accept='image/*' className='blog-form__photo-input' onChange={photoValidation} />
                                {/* <button onClick={uploadPhoto} disabled={uploadingPhoto || photoUrl}>
                                    Upload
                                </button> */}
                            </label>
                        </>}
                    {/* {!audioUrl && audioClicked ?
                        <>
                            <label>
                                Audio:
                                <input type="file" accept='audio/*' className='blog-form__audio-input' />
                                <button>
                                    Post
                                </button>
                            </label>
                        </>
                        : ""} */}
                </div>}
            </div>
        </>
    );
}

export default BlogForm;
