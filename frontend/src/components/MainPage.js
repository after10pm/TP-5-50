import React, {Component} from 'react';
import './Header.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Register from "../pages/Register";

export default class MainPage extends Component {
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <NavLink exact to="/authorization" className='button'>Вход</NavLink>
                <NavLink exact to="/register" className='button-reg'>Регистрация</NavLink>

            </div>


        );
    }
}
