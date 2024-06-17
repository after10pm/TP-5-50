import React, {useEffect, useRef, useState} from 'react';
import "../components/AuthorPage.css";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoadingAnimation from "../animaiton/LoadingAnimation";

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

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
            return response.data;
        } catch (err) {
            console.error(err.toJSON());
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8000");
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
                        <div className='acc-block-2' style={{top:'477px', left:'440px', width:'1026px'}}></div>

                        <div className='container' style={{position: 'absolute', top: '260px', left:'-120px'}}>
                            <div className='change-block-acc'></div>
                            <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${authorUser ? authorUser.name : ''}`} className='account-img' style={{left: '790px', top:'265px', width:'32px',height:'32px'}} alt="avatar" />

                            <div className='acc-text-4'>{authorUser ? authorUser.name : ''}</div>
                            <div className='imgfs-3'></div>
                            <div className='acc-text-5'>Название поста 1</div>
                            <div className='text-under-post'>
                                Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.
                                Дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы.
                            </div>
                            <div className='date-post'>18:01 21.08.2024</div>
                            <div className='heart' style={{left:'1210px', top:'282px'}}></div>
                            <div className='number-likes' style={{top:'282px',left:'1235px'}}>1000</div>
                            <div className='comments' style={{top:'282px',left:'1335px'}}>93</div>
                            <i className="bi bi-chat-right-text comments-mark" style={{top:'278px',left:'1305px'}}></i>


                            <div className='account-text-read'>Читать далее...</div>

                            <div className='rec' style={{left: '805px', top: '706px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                            <div className='account-check-mark'/>

                        </div>
                        <div className='container' style={{position: 'absolute', top: '780px', left:'-120px'}}>
                            <div className='change-block-acc' style={{height:'528px'}}></div>
                            <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${authorUser ? authorUser.name : ''}`} className='account-img' style={{left: '790px', top:'265px', width:'32px',height:'32px'}} alt="avatar" />
                            <div className='acc-text-4'>{authorUser ? authorUser.name : ''}</div>
                            <div className='imgfs-3'></div>
                            <div className='acc-text-5'>Мои идейные соображения</div>
                            <div className='text-under-post'>
                                Идейные соображения высшего порядка, а также сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития.
                            </div>
                            <div className='date-post' style={{top:'650px'}}>18:01 21.08.2024</div>
                            <div className='heart' style={{left:'1210px', top:'282px'}}></div>
                            <div className='number-likes' style={{top:'282px',left:'1235px'}}>1000</div>
                            <div className='comments' style={{top:'282px',left:'1335px'}}>93</div>
                            <i className="bi bi-chat-right-text comments-mark" style={{top:'278px',left:'1305px'}}></i>

                            <div className='account-text-read' style={{top:'650px', left:"875px"}}>0Nickname0</div>

                            {/*<div className='rec' style={{left: '805px', top: '706px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>*/}
                            {/*<div className='account-check-mark'/>*/}


                        </div>
                        <div className='imgfs' style={{left:'710px', top:'1435px'}}></div>
                        {/*<div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>*/}
                        <div className='account-text-comment'>Хинаточка, продолжай нас радовать своим твореством!!!!</div>
                        <div className='imgfs' style={{left:'710px', top:'1515px'}}></div>

                        <input type="text" id="comment" name="comment" placeholder="Оставить комментарий" className='account-text-write'/>


                    </div>
                );
            }
    }
}

export default AuthorPage;