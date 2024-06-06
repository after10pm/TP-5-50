import React, {Component, useEffect, useState} from 'react';
import MainPage from "../components/MainPage";
import {Navigate, NavLink} from "react-router-dom";
import LoadingAnimation from "../animaiton/LoadingAnimation";

function ServicePanel(props) {
    const user = props.user;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (user === '') {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )
        }
        else  {
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

        }
        if (user.is_staff){
            return (
                <div className='header'>
                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
                    <div className='rec' style={{
                        left: '1860px',
                        top: '25px',
                        backgroundColor: '#DFDEFF',
                        width: '21px',
                        height: '21px'
                    }}></div>
                    <div className='account-check-mark'
                         style={{left: '1866.5px', top: '30px', width: '6px', height: '6px'}}></div>
                    <div className='admins-fon'>
                        <div className='admins-img'></div>
                        <div className='admins-img-2'></div>
                    </div>

                    <NavLink exact to="/categoryAdmins" className='panelS'>Переход к управлению категориями</NavLink>

                    <NavLink exact to="/adminAccounts" className='panelS' style={{left: '1000px'}}>Переход к управлению
                        аккаунтами пользователей</NavLink>
                </div>
            );
        } else{
            return (
                <div>
                    <Navigate to={"/my_profile"}/>
                </div>
            )
        }


    }
}

export default ServicePanel;