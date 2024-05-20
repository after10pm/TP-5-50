import React, {Component, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";

function PersonalAccountAuthor() {
    const location = useLocation();
    const user = location.state.user;
    const [isUnsubscribeVisible, setIsUnsubscribeVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const history = useNavigate();


    const handleUnsubscribe = () => {
        setIsUnsubscribeVisible(!isUnsubscribeVisible);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleNavigateToChangeBlog = () => {
        const user = location.state.user

        history('/blogEditing', { state: {user}  });
    };

    return (
        <div className='header'>
            <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
            <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>{user.name}</div>
            <div className='imgfs'></div>
            <div className='block-acc'></div>
            <div className='imgfs' style={{position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px'}}></div>
            <div className='acc-text-nick'>{user.name}</div>
            <div className='acc-text-email'>{user.email}</div>

            <div className='button' onClick={handleNavigateToChangeBlog} style={{position: 'absolute', left: '256px', top:'405px', width: '235px', height:'56px', backgroundColor:'#807EFF', color:"white", borderRadius:'75px'}}>Редактирование блога</div>
            <div className='acc-text-2'>Изменить данные</div>

            <div className='acc-block-2'></div>
            <div className='acc-text-3'>Подписки</div>

            {isUnsubscribeVisible ?
                <div className='acc-button-unscribe' onClick={handleUnsubscribe} style={{backgroundColor: isHovered ? '#807EFF' : '#FF6F6F'}}>Подписаться</div> :
                <div className='acc-button-info' onClick={handleUnsubscribe} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{backgroundColor: isHovered ? '#FF6F6F' : '', color: isHovered ? '#FFFFFF' : ''}}>
                    {isHovered ? 'Отписаться' : 'Вы подписаны'}
                </div>
            }

            <NavLink exact to="/authorPage" className='acc-text-nick-another'>username</NavLink>
            <div className='imgfs-2'></div>
        </div>
    );
}

export default PersonalAccountAuthor;