import React, {Component, useState} from 'react';

function NewPost ({addNewPost, posts}){
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');

    const handleTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setPostText(event.target.value);
    };

    const handleAddFromHide = () => {
        setPostTitle('');
        setPostText('');
    };

    const createPost = () => {
        if (postTitle === '' || postText === '') {
            alert('Нельзя создавать пустые посты!');
            return;
        }

        const newPost = {
            index: posts.length + 1,
            title: postTitle,
            description: postText,
            author: '0Nickname0',
            date: new Date().toLocaleDateString()
        };

        handleAddFromHide();
        addNewPost(newPost);
    };

    return (
        <div>
            <div className='block-create-post'></div>

            <input
                type="text"
                id="post_text"
                name="post_text"
                placeholder="Введите заголовок"
                className='block-create-text'
                value={postTitle}
                onChange={handleTitleChange}
            />

            <textarea
                placeholder='Введите текст поста'
                className='block-create-text-2'
                value={postText}
                onChange={handleTextChange}
            />

            <input type="file" id="fileInput" style={{ display: 'none' }} accept=".jpg, .png" />
            <i className="bi bi-paperclip block-create-img-2" onClick={() => document.getElementById('fileInput').click()}></i>
            <div className='block-create-img' onClick={() => document.getElementById('fileInput').click()}>Прикрепить картинку</div>

            <button className='create-post' style={{ top: '1090px' }} onClick={createPost}>Опубликовать пост</button>
        </div>
    );
};

export default NewPost;