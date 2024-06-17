import React, {Component, useEffect, useState} from 'react';
import MainPage from "../components/MainPage";
import MainMenu from "../components/MainMenu";
import Fotter from "../components/Fotter";
import {BrowserRouter, NavLink, useLocation, useNavigate} from "react-router-dom";

function MainMenuPage(props) {
    const history = useNavigate();

    const redirectToMyAccount = () => {
        history('/my_profile');
    };

    const logout = async () => {
        await fetch('http://localhost:8000/logout/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        window.location.reload()

    }


    if (props.user !== ''){
        return (
            <div>
                <div className='header'>

                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button' style={{ position: 'absolute', left: '1660px', width: '215px' }} onClick={redirectToMyAccount}>{props.user.name}</div>
                    <NavLink exact to="/" className="button" style={{left:"1000px"}} onClick={logout}>Logout</NavLink>
                    <div className='imgfs'></div>
                    <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                    <div className='account-check-mark' style={{left: '1866.5px', top: '30px', width:'6px', height:'6px'}}/>
                </div>
                <MainMenu/>
                <Fotter/>
            </div>
        );
    }
    else {
        return (

            <div>
                <MainPage/>
                <MainMenu/>
                <Fotter/>
            </div>


        );

    }

}

export default MainMenuPage;