import React, {useEffect, useRef, useState} from 'react';
import "../components/AuthorPage.css";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import Post from "../components/Post";
import AuthorPost from "../components/AuthorPost";

function AuthorPage(props) {
    const [subscribed, setSubscribed] = useState(false);
    const user = props.user;
    const history = useNavigate();
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

    const toggleSubscribed = () => {
        setSubscribed(prevSubscribed => !prevSubscribed);
    };
    const [details, setDetails] = useState([]);
    let { userId } = useParams();
    const [authorUser, setAuthorUser] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${userId}/`);
            console.log(response.data)
            return response.data;
        } catch (err) {
            console.error(err.toJSON());
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/users/");
                setDetails(res.data);
                const user = await getUserById(userId);
                setAuthorUser(user);
            } catch (err) {
                console.log(err);
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

    useEffect(() => {
        if (authorUser) {
            let data;
            const author_id = authorUser.id
            const response = axios.get(`http://localhost:8000/posts/${author_id}/`)
                .then(res => {
                    data = res.data;
                    setPosts(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user.id, posts, authorUser]);

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
                        <div className={`account-button ${subscribed ? 'subscribed' : ''}`} onClick={toggleSubscribed}>
                            {subscribed ? 'Подписаться' : 'Отписаться'}
                        </div><div className='account-button' style={{backgroundColor:'#FF6F6F'}}>
                            Отписаться
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