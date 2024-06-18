import {Navigate, NavLink, useNavigate} from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

import React, {useEffect, useRef, useState} from 'react';
import Post from "../components/Post";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import axios from "axios";
export default PersonalAccount;


function PersonalAccount(props) {
    const [details, setDetails] = useState([]);
    const history = useNavigate();
    const user = props.user;
    const [unsubscribedUsers, setUnsubscribedUsers] = useState([]);
    const [hoveredIndices, setHoveredIndices] = useState([]);
    const isAuthor = user.author_status;
    const [isLoading, setIsLoading] = useState(true);
    const [subs, setSubs] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const markClick = () => {
        setIsVisible(!isVisible);
    }
    const checkMarkRef = useRef();
    const menuRef = useRef();
    useEffect(() =>{
        function clickOutsideMenu(event) {
            if (menuRef.current && !checkMarkRef.current.contains(event.target) && !menuRef.current.contains(event.target)){
                setIsVisible(false);
            }
        }
        document.addEventListener('click', clickOutsideMenu);
        return () => {
            document.removeEventListener('click', clickOutsideMenu);
        };
    }, []);
    const redirectToMyAccount = () => {
        history('/my_profile');
    };
    const redirectToCategory = () => {
        history('/category');
    };
    const logout = async () => {
        await fetch('http://localhost:8000/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        window.location.reload()

    }



    const handleUnsubscribe = (userId) => {
        axios.delete(`http://localhost:8000/subscriptions/delete/${userId}/`)
            .then(() => {
                setUnsubscribedUsers([...unsubscribedUsers, userId]);
            })
            .catch(error => {
                console.error('Error unsubscribing:', error);
            });
    };
    const handleSubscribe = (subscriber) => {
        const data = { author: subscriber.id, user: user.id };
        axios.post('http://localhost:8000/subscriptions/', data)
            .then(() => {
                setUnsubscribedUsers(unsubscribedUsers.filter(id => id !== subscriber.id)); // Удаляем из списка после успешного запроса
            })
            .catch(error => {
                console.error('Error subscribing:', error);
            });
    };

    const handleMouseEnter = (index) => {
        setHoveredIndices([...hoveredIndices, index]);
    };

    const handleMouseLeave = (index) => {
        setHoveredIndices(hoveredIndices.filter(item => item !== index));
    };
    const handleNavigateToAction = async () => {
        if (isAuthor) {
            history('/blogEditing');
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

    useEffect(() => {
        let data;

        const response = axios.get("http://localhost:8000/api/users/")
            .then(res => {
                data = res.data;
                setDetails(data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const fetchSubscriptions = async () => {
        try {
            if (!user || !user.id) {
                return;
            }
            const subscriber_id = user.id;
            const response = await axios.get(`http://localhost:8000/api/subscriptionsUser/${subscriber_id}/`);
            if (response.status !== 200) {
                console.error('Error fetching subscriptions data');
            }
            const data = response.data;
            setSubs(data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, [user]);

    const getSubscribedUsers = () => {
        if (!Array.isArray(subs)) {
            return [];
        }
        const authorIds = subs.map(sub => sub.author);

        return details.filter(user => authorIds.includes(user.id));
    };

    if (user === '') {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
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
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )
        } else {
            const subscribedUsers = getSubscribedUsers();

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
                    <div ref={checkMarkRef} className='account-check-mark' onClick={markClick}
                         style={{left: '1866.5px', top: '30px', width: '6px', height: '6px'}}></div>
                    {isVisible && <div ref={menuRef} className='menu' style={{
                        position: 'absolute',
                        top: '10px',
                        paddingTop: '10px',
                        right: '7px',
                        width: '216px',
                        height: '110px',
                    }}>
                        <div className='sub-menu' onClick={redirectToMyAccount}>{user.name}</div>
                        <div className='sub-menu' onClick={redirectToCategory}>Категории</div>
                        <div className='sub-menu' onClick={logout}>Выйти из аккаунта</div>
                    </div>}

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

                    {subscribedUsers.map((subscriber, index) => (
                        <div key={subscriber.id} style={{position: "absolute", top: 80 * index + 'px'}}>
                            <NavLink to={`/profile/${subscriber.id}`} className='acc-text-nick-another'>
                                {subscriber.name}
                            </NavLink>
                            <div className='imgfs-2'></div>
                            {unsubscribedUsers.includes(subscriber.id) ?
                                <div className='acc-button-unsubscribe' onClick={() => handleUnsubscribe(subscriber.id)}
                                     style={{backgroundColor: hoveredIndices.includes(index) ? '#FF6F6F' : '#807EFF'}}
                                     onMouseEnter={() => handleMouseEnter(index)}
                                     onMouseLeave={() => handleMouseLeave(index)}
                                >Отписаться</div>
                                :
                                <div className='acc-button-info' onClick={() => handleSubscribe(subscriber)}
                                     style={{
                                         backgroundColor: hoveredIndices.includes(index) ? '#FF6F6F' : '',
                                         color: hoveredIndices.includes(index) ? '#FFFFFF' : ''
                                     }}
                                     onMouseEnter={() => handleMouseEnter(index)}
                                     onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    {hoveredIndices.includes(index) ? 'Отписаться' : 'Вы подписаны'}
                                </div>
                            }
                        </div>
                    ))}

                </div>
            );
        }

    }
}
