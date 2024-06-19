import React, {Component, useEffect, useRef, useState} from 'react';
import Post from "../components/Post";
import Statistic from "../components/Statistic";
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import NewPost from "../components/NewPost";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import axios from "axios";


function BlogEditing(props) {
    const location = useLocation();
    const user = props.user;
    const [showNewPost, setShowNewPost] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [postToDelete, setPostToDelete] = useState(null);

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


        useEffect(() => {
            let data;
            const user_id = user.id
            const response = axios.get(`http://localhost:8000/posts/${user_id}/`)
                .then(res => {
                    data = res.data;
                    setPosts(data);
                    console.log(posts)

                })
                .catch(err => {
                    console.log(err);
                });

        }, [user.id, posts]);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];

    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    const addNewPost = async (newPost) => {
        try {
            const response = await axios.post('http://localhost:8000/posts/', {
                title: newPost.title,
                content: newPost.content,
                user_id: user.id
            });

            console.log(response.data)
            const updatedPosts = [...posts, response.data];
            setPosts(updatedPosts);
            setShowNewPost(false);
            setShowButton(true);
        } catch (error) {
            console.error('Error adding new post:', error);
        }
    };

    const handleCreatePost = () => {
        setShowNewPost(true);
        setShowButton(false);
    };

    const blogPosts = posts.map((item, index) => (
        <div key={item.index} className='container' style={{position: 'absolute', top: (index * 510) + 'px', left: '0px' }}>
            <Post post_id={item.post_id}
                  title={item.title}
                  content={item.content}
                  user={user.name}
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

    }else{
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
                    <div className='button' style={{ position: 'absolute', left: '1660px', width: '215px' }}>{user.name}</div>
                    <div className='imgfs'></div>
                    <div className='rec' style={{ left: '1860px', top: '25px', backgroundColor: '#DFDEFF', width: '21px', height: '21px' }}></div>
                    <div className='account-check-mark' style={{ left: '1865px', top: '27px', width: '9px', height: '9px' }}></div>
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
                    <div className='block-acc' style={{ height: '350px' }}></div>
                    <div className='imgfs' style={{ position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px' }}></div>
                    <div className='acc-text-nick'>{user.name}</div>
                    <div className='acc-text-email'>{user.email}</div>
                    <div className='acc-text-2' style={{ top: '440px' }}>Изменить данные</div>
                    <div className='acc-block-2' style={{ height: Math.max(640, posts.length * 580) + 'px' }}></div>

                    {showButton && <div className='create-post' onClick={handleCreatePost}>Создать пост</div>}

                    <div className='acc-text-3' style={{ width: '480px', top: '190px' }}>Редактирование блога</div>

                    {showNewPost && <NewPost addNewPost={addNewPost} posts={posts} user={user} />}
                    <div>
                        {blogPosts}
                    </div>


                    <Statistic />
                </div>
            );
        }

    }

};

export default BlogEditing;