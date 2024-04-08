import React, {Component} from 'react';
import './Header.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Register from "../pages/Register";

export default class MainPage extends Component {
    render() {
        return (

            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <NavLink exact to="/" className='button'>Вход</NavLink>
                <NavLink exact to="/registration" className='button-reg'>Регистрация</NavLink>
                <Routes>
                    <Route exact path="/registration" element={<Register/>}/>
                </Routes>
            </div>


        );
    }
}
