import {NavLink, useLocation, useNavigate} from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

import React, { useState } from 'react';
import Post from "../components/Post";

function PersonalAccount() {
    const history = useNavigate();
    const [isUnsubscribeVisible, setIsUnsubscribeVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();


    const handleUnsubscribe = () => {
        setIsUnsubscribeVisible(!isUnsubscribeVisible);
    };
    const handleNavigateToAuthor = () => {
        const user = location.state.user
        console.log(user)
        history('/profileAuthor', { state: {user}  });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };



    return (
        <div className='header'>
            <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
            <div className='button' style={{ position: 'absolute', left: '1660px', width: '215px' }}>{location.state.user.name}</div>
            <div className='imgfs'></div>
            <BlockAcc user={location.state.user} />
            <div className='button'  onClick={handleNavigateToAuthor} style={{ position: 'absolute', left: '270px', top: '405px', width: '212px', height: '56px', backgroundColor: '#807EFF', color: "white", borderRadius: '75px' }}>Стать автором</div>
            <div className='acc-block-2'></div>
            <div className='acc-text-3'>Подписки</div>

            {isUnsubscribeVisible ?
                <div className='acc-button-unscribe' onClick={handleUnsubscribe} style={{ backgroundColor: isHovered ? '#807EFF' : '#FF6F6F' }}>Подписаться</div> :
                <div className='acc-button-info' onClick={handleUnsubscribe} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ backgroundColor: isHovered ? '#FF6F6F' : '', color: isHovered ? '#FFFFFF' : '' }}>
                    {isHovered ? 'Отписаться' : 'Вы подписаны'}
                </div>
            }
            <NavLink exact to="/authorPage" className='acc-text-nick-another'>username</NavLink>
            <div className='imgfs-2'></div>
        </div>
    );
}

export default PersonalAccount;