import React, {Component, useEffect, useRef, useState} from 'react';
import MainPage from "../components/MainPage";
import '../components/Rules.css';
import {NavLink, useNavigate} from "react-router-dom";
import Rules from "../components/Rules";
import {getAccessTokenFromCookies} from "../components/CookiesUtils";


function RulesPage(props) {
    const history = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const markClick = () => {
        setIsVisible(!isVisible);
    }
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
    const redirectToMyAccount = () => {
        history('/my_profile');
    };
    const redirectToCategory = () => {
        history('/category');
    };
    const logout = async () => {
        const accessToken = getAccessTokenFromCookies();
        await fetch('http://79.174.84.116:8000/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Включение токена доступа в заголовке
            },
            credentials: 'include',
        });
        window.location.reload()
    }
    if (props.user !== '') {
        return (
            <div>
                <div className='header'>

                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button'
                         style={{position: 'absolute', left: '1660px', width: '215px'}}>{props.user.name}
                    </div>

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
                        <div className='sub-menu' onClick={redirectToMyAccount}>{props.user.name}</div>
                        <div className='sub-menu' onClick={redirectToCategory}>Категории</div>
                        <div className='sub-menu' onClick={logout}>Выйти из аккаунта</div>
                    </div>}
                </div>
                <Rules/>
            </div>
        );
    } else {
        return (

            <div>
                <Rules/>

            </div>


        );

    }
}

export default RulesPage;