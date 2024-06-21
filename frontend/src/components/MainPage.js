import React, {Component} from 'react';
import './Header.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Register from "../pages/Register";



function MainPage () {
    const logout = async () => {
        await fetch('http://79.174.84.116:8000/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        window.location.reload();
    }
    return (
        <div className='header'>

            <NavLink exact to="/" className="brand">SocialSphere</NavLink>
            <NavLink exact to="/authorization" className='button'>Вход</NavLink>
            <NavLink exact to="/register" className='button-reg'>Регистрация</NavLink>
        </div>
    );
}

export default MainPage;
