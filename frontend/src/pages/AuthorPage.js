import React, {useEffect, useRef, useState} from 'react';
import "../components/AuthorPage.css";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import Post from "../components/Post";
import AuthorPost from "../components/AuthorPost";
import { getAccessTokenFromCookies } from "../components/CookiesUtils";

function AuthorPage(props) {
    const [subscribed, setSubscribed] = useState(false);
    const user = props.user;
    const history = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [details, setDetails] = useState([]);
    let { userId } = useParams();
    const [authorUser, setAuthorUser] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const markClick = () => {
        setIsVisible(!isVisible);
    }
    const checkMarkRef = useRef();
    const menuRef = useRef();
    useEffect(() =>{
        const checkUserExistence = async () => {
            try {
                const response = await axios.get(`http://79.174.84.116:8000/users/${userId}/`);
                setAuthorUser(response.data);
            } catch (error) {
                console.error('User not found:', error);

                history('/');
            }
        };

        checkUserExistence();
    }, [userId, history]);
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
    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await axios.get(`http://79.174.84.116:8000/subscriptions/${authorUser.id}/${user.id}/`);
                const isSubscribed = response.data.isSubscribed;
                setSubscribed(isSubscribed);
                console.log(isSubscribed)
            } catch (error) {
                console.error('Error checking subscription:', error);
            }
        };

        if (authorUser) {
            checkSubscription();
        }
    }, [authorUser, user.id]);
    useEffect(() => {
        if (authorUser) {
            let data;
            const author_id = authorUser.id
            const response = axios.get(`http://79.174.84.116:8000/posts/${author_id}/`)
                .then(res => {
                    data = res.data;
                    setPosts(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user.id, posts, authorUser]);
    const redirectToMyAccount = () => {
        history('/my_profile');
    };
    const redirectToCategory = () => {
        history('/category');
    };
    const logout = async () => {
        const accessToken = getAccessTokenFromCookies(); // Access token теперь доступен в функции logout

        await fetch('http://79.174.84.116:8000/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Включение токена доступа в заголовке
            },
            credentials: 'include',
        });
        window.location.reload();
    }

    const toggleSubscribed = async () => {
        try {
            const accessToken = getAccessTokenFromCookies();

            if (!accessToken) {

                console.error('Access token not found');
                return;
            }

            if (subscribed) {
                await axios.delete(`http://79.174.84.116:8000/subscriptions/${authorUser.id}/${user.id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSubscribed(false);
            } else {
                console.log(authorUser.id, user.id);
                const response = await axios.post(
                    'http://79.174.84.116:8000/subscriptions/',
                    {
                        author: authorUser.id,
                        subscriber: user.id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Добавляем Authorization header
                        },
                    }
                );
                setSubscribed(true);
            }
        } catch (error) {
            console.error('Error subscribing/unsubscribing:', error);
        }
    };

    const getUserById = async (userId) => {
        try {
            const accessToken = getAccessTokenFromCookies();

            if (!accessToken) {
                console.error('Access token not found');
                return null;
            }

            const response = await axios.get(`http://79.174.84.116:8000/users/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Request error:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = getAccessTokenFromCookies();

                if (!accessToken) {
                    console.error('Access token not found');
                    return;
                }

                const [detailsResponse, authorResponse] = await Promise.all([
                    axios.get('http://79.174.84.116:8000/users/', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }),
                    getUserById(userId),
                ]);

                setDetails(detailsResponse.data);
                setAuthorUser(authorResponse);
            } catch (error) {
                console.error('Request error:', error);
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    const blogPosts = posts.map((item, index) => (
        <div key={item.index} className='container' style={{position: 'absolute', top: (index*510)+'px', left:'-120px'}}>>
            <AuthorPost post_id={item.post_id}
                  title={item.title}
                  content={item.content}
                  user={authorUser.name}
                  date={item.date}
            />
        </div>
    ));

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

    }
    else{
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
                        <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
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


                        <div className='account-block'></div>
                        <div className='account-header'></div>
                        <div
                            className={`account-button ${subscribed ? 'subscribed' : ''}`}
                            onClick={toggleSubscribed}
                            style={{ backgroundColor: subscribed ? '#FF6F6F' : '#807EFF' }} // Меняем цвет фона в зависимости от состояния
                        >
                            {subscribed ? 'Отписаться' : 'Подписаться'}
                        </div>
                        <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${authorUser ? authorUser.name : ''}`} className='account-img' alt="avatar" />
                        <div className='account-text-username'>{authorUser ? authorUser.name : ''}</div>
                        <div className='acc-block-2' style={{top:'477px', left:'440px', width:'1026px', height: Math.max(640, posts.length * 530) + 'px'}}></div>

                        <div>
                            {blogPosts}
                        </div>
                        {/*<div className='imgfs' style={{left:'710px', top:'1435px'}}></div>*/}
                        {/*/!*<div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>*!/*/}
                        {/*<div className='account-text-comment'>Хинаточка, продолжай нас радовать своим твореством!!!!</div>*/}
                        {/*<div className='imgfs' style={{left:'710px', top:'1515px'}}></div>*/}

                        {/*<input type="text" id="comment" name="comment" placeholder="Оставить комментарий" className='account-text-write'/>*/}


                    </div>
                );
            }
    }
}

export default AuthorPage;
