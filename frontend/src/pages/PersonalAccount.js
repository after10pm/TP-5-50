import {Navigate, NavLink, useNavigate} from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

import React, {useEffect, useRef, useState} from 'react';
import Post from "../components/Post";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import axios from "axios";
import AuthorPage from "./AuthorPage";
import { getAccessTokenFromCookies } from "../components/CookiesUtils";


function PersonalAccount(props) {
    const [details, setDetails] = useState([]);
    const history = useNavigate();
    const user = props.user;
    const [unsubscribedUsers, setUnsubscribedUsers] = useState([]);
    const [hoveredIndices, setHoveredIndices] = useState([]);
    const isAuthor = user.author_status;
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const markClick = () => {
        setIsVisible(!isVisible);
    };
    const checkMarkRef = useRef();
    const menuRef = useRef();



    useEffect(() => {
        function clickOutsideMenu(event) {
            if (menuRef.current && !checkMarkRef.current.contains(event.target) && !menuRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        }
        document.addEventListener('click', clickOutsideMenu);
        return () => {
            document.removeEventListener('click', clickOutsideMenu);
        };
    }, []);

    const handleUnsubscribe = async (userId) => {
        const accessToken = getAccessTokenFromCookies();
        try {
            await axios.delete(`http://79.174.84.116:8000/subscriptions/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUnsubscribedUsers([...unsubscribedUsers, userId]);
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
    };


    const redirectToMyAccount = () => {
        history('/my_profile');
    };

    const redirectToCategory = () => {
        history('/category');
    };

    const logout = async () => {
        const accessToken = getAccessTokenFromCookies();
        try {
            await fetch('http://79.174.84.116:8000/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleMouseEnter = (index) => {
        setHoveredIndices([...hoveredIndices, index]);
    };

    const handleMouseLeave = (index) => {
        setHoveredIndices(hoveredIndices.filter((item) => item !== index));
    };

    const handleNavigateToAction = async () => {
        if (isAuthor) {
            history('/blogEditing');
        } else {
            const accessToken = getAccessTokenFromCookies();
            try {
                const response = await fetch(`http://79.174.84.116:8000/user/${user.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                window.location.reload();
            } catch (error) {
                console.error('Error sending PUT request:', error);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const accessToken = getAccessTokenFromCookies();
            try {
                if (!user || !user.id) {
                    return;
                }
                const subscriber_id = user.id;
                const response = await axios.get(`http://79.174.84.116:8000/subscriptionsByUser/${subscriber_id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status !== 200) {
                    console.error('Error fetching subscriptions data');
                }
                const data = response.data;
                setDetails(data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, [user]);


    // Функция для проверки, подписан ли пользователь
    const isSubscribed = (subscriberId) => {
        return !unsubscribedUsers.includes(subscriberId);
    };

    if (user === '') {
        if (isLoading) {
            return (
                <div className="center-anim">
                    <LoadingAnimation />
                </div>
            );
        } else {
            return (
                <div>
                    <Navigate to="/authorization" />
                </div>
            );
        }
    } else {
        if (isLoading) {
            return (
                <div className="center-anim">
                    <LoadingAnimation />
                </div>
            );
        } else {
            return (
                <div className="header">
                    <NavLink exact to="/" className="brand">
                        SocialSphere
                    </NavLink>
                    <div className="button" style={{ position: 'absolute', left: '1660px', width: '215px' }}>
                        {user.name}
                    </div>
                    <div className="imgfs"></div>
                    <div
                        className="rec"
                        style={{
                            left: '1860px',
                            top: '25px',
                            backgroundColor: '#DFDEFF',
                            width: '21px',
                            height: '21px',
                        }}
                    ></div>
                    <div
                        ref={checkMarkRef}
                        className="account-check-mark"
                        onClick={markClick}
                        style={{ left: '1866.5px', top: '30px', width: '6px', height: '6px' }}
                    ></div>
                    {isVisible && (
                        <div
                            ref={menuRef}
                            className="menu"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                paddingTop: '10px',
                                right: '7px',
                                width: '216px',
                                height: '110px',
                            }}
                        >
                            <div className="sub-menu" onClick={redirectToMyAccount}>
                                {user.name}
                            </div>
                            <div className="sub-menu" onClick={redirectToCategory}>
                                Категории
                            </div>
                            <div className="sub-menu" onClick={logout}>
                                Выйти из аккаунта
                            </div>
                        </div>
                    )}

                    <BlockAcc user={user} />
                    <div
                        className="button"
                        onClick={handleNavigateToAction}
                        style={{
                            position: 'absolute',
                            left: '270px',
                            top: '405px',
                            width: '212px',
                            height: '56px',
                            backgroundColor: '#807EFF',
                            color: 'white',
                            borderRadius: '75px',
                        }}
                    >
                        {isAuthor ? 'Редактирование блога' : 'Стать автором'}
                    </div>
                    <div className="acc-block-2"></div>
                    <div className="acc-text-3">Подписки</div>

                    {details.map((subscriber, index) => (
                        <div key={subscriber.id} style={{ position: 'absolute', top: 80 * index + 'px' }}>
                            <NavLink to={`/profile/${subscriber.id}`} className="acc-text-nick-another">
                                {subscriber.name}
                            </NavLink>
                            <div className="imgfs-2"></div>
                            {isSubscribed(subscriber.id) ? (
                                <div
                                    className="acc-button-info"
                                    style={{
                                        backgroundColor: hoveredIndices.includes(index) ? '#FF6F6F' : '',
                                        color: hoveredIndices.includes(index) ? '#FFFFFF' : '',
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    Вы подписаны
                                </div>
                            ) : (
                                <div
                                    className="acc-button-unsubscribe"
                                    onClick={() => handleUnsubscribe(subscriber.id)}
                                    style={{
                                        backgroundColor: hoveredIndices.includes(index) ? '#FF6F6F' : '#807EFF',
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    Отписаться
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default PersonalAccount;