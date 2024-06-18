import React, {Component, useState} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function Post(props) {
    const [isPostDeleted, setIsPostDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.content);

    const handleDeletePost = async () => {
        const postId = props.post_id
        console.log(postId)
        const confirmDelete = window.confirm("Вы действительно хотите удалить пост?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/posts/${postId}/`); // Удаляем пост на сервере
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };
    const handleEditPost = async () => {
        const postId = props.post_id;
        try {
            const response = await axios.put(
                `http://localhost:8000/posts/${postId}/`,
                { content: editedText }
            );
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const toggleEdit = () => {
        // Проверяем, находится ли компонент в режиме редактирования
        if (isEditing) {
            // Если в режиме редактирования, вызываем handleEditPost для сохранения изменений
            handleEditPost();
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (event) => {
        setEditedText(event.target.value);
    };

    if (isPostDeleted) {
        return <div>Ваш пост удалён</div>;
    } else {
        return (
            <div>

                <div className='change-block-acc'></div>
                <div className='button-change-post' onClick={toggleEdit}>Редактировать пост</div>
                <div className='button-delete-post' onClick={handleDeletePost}>Удалить пост</div>
                <div className='imgfs' style={{left: '800px', top: '280px'}}></div>
                <div className='acc-text-4'>{props.user}</div>
                <div className='imgfs-3'></div>
                <div className='acc-text-5'>{props.title}</div>
                {isEditing ? (
                    <>
                    <textarea className='text-under-post-change' style={{left: '861px', top: '510px'}}
                              value={editedText} onChange={handleChange}/>
                    </>
                ) : (
                    <div className='text-under-post'>{editedText}</div>
                )}
                <div className='date-post'>{props.date}</div>
                <div className='heart'></div>
                <div className='number-likes'>1000</div>
                <i className="bi bi-chat-right-text comments-mark"></i>
                <div className='comments'>30</div>
            </div>
        );
    }

}

export default Post;