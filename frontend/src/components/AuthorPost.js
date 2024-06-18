import React, {useState} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function Post(props) {
    const [isPostDeleted, setIsPostDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.content);


    {
        return (
            <div style={{position: 'absolute', top:'230px'}}>

                <div className='change-block-acc'></div>
                <div className='imgfs' style={{left: '800px', top: '280px'}}></div>
                <div className='acc-text-4'>{props.user}</div>
                <div className='imgfs-3'></div>
                <div className='acc-text-5'>{props.title}</div>
                <div className='text-under-post'>{editedText}</div>
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