import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

import React, {useEffect, useState} from 'react';
import Post from "../components/Post";
import LoadingAnimation from "../animaiton/LoadingAnimation";

function PersonalAccount(props) {
    const history = useNavigate();
    const user = props.user;
    const [isUnsubscribeVisible, setIsUnsubscribeVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isAuthor = user.author_status; // Assuming user object has a property isAuthor to indicate author status
    const [isLoading, setIsLoading] = useState(true);


    const handleUnsubscribe = () => {
        setIsUnsubscribeVisible(!isUnsubscribeVisible);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 700); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);
    const handleNavigateToAction = async () => {
        if (isAuthor) {
            history('/blogEditing', {state: {user}});
        } else {
            try {
                const response = await fetch(`http://localhost:8000/change/author_status/${user.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    };

    if (user === '') {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation />
                </div>
            )
        } else {
            return (
                <div>
                    <Navigate to={"/authorization"}/>
                </div>
            )

        }

    } else {
        if (isLoading){
            return (
                <div className='center-anim'>
                    <LoadingAnimation />
                </div>
            )

        } else {
            return (
                <div className='header'>
                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>{user.name}</div>
                    <div className='imgfs'></div>
                    <div className='rec' style={{
                        left: '1860px',
                        top: '25px',
                        backgroundColor: '#DFDEFF',
                        width: '21px',
                        height: '21px'
                    }}></div>
                    <div className='account-check-mark'
                         style={{left: '1866.5px', top: '30px', width: '6px', height: '6px'}}></div>
                    <BlockAcc user={user}/>
                    <div className='button' onClick={handleNavigateToAction} style={{
                        position: 'absolute',
                        left: '270px',
                        top: '405px',
                        width: '212px',
                        height: '56px',
                        backgroundColor: '#807EFF',
                        color: "white",
                        borderRadius: '75px'
                    }}>
                        {isAuthor ? 'Редактирование блога' : 'Стать автором'}
                    </div>
                    <div className='acc-block-2'></div>
                    <div className='acc-text-3'>Подписки</div>

                    {isUnsubscribeVisible ?
                        <div className='acc-button-unscribe' onClick={handleUnsubscribe}
                             style={{backgroundColor: isHovered ? '#807EFF' : '#FF6F6F'}}>Подписаться</div> :
                        <div className='acc-button-info' onClick={handleUnsubscribe} onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}
                             style={{backgroundColor: isHovered ? '#FF6F6F' : '', color: isHovered ? '#FFFFFF' : ''}}>
                            {isHovered ? 'Отписаться' : 'Вы подписаны'}
                        </div>
                    }
                    <NavLink exact to={isAuthor ? "/profileAuthor" : "/profile/1"}
                             className='acc-text-nick-another'>{user.username || 'username'}</NavLink>
                    <div className='imgfs-2'></div>
                </div>
            );
        }

    }
}

export default PersonalAccount;