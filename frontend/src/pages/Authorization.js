import React, {Component, useEffect, useState} from 'react';
import '../components/Register.css';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {SyntheticEvent} from "react";
import {redirect} from "react-router-dom";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function Authorization (props)  {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [details, setDetails] = useState([]);
    const [redirectTo, setRedirect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8000");
                setDetails(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []); // Empty dependencies array to run once on component mount

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const isValidEmail = EMAIL_REGEXP.test(emailValue);
        setEmail(emailValue);
        setIsEmailValid(isValidEmail);
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        const isValidPassword = passwordValue.length >= 6;
        setPassword(passwordValue);
        setIsPasswordValid(isValidPassword);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Неправильный email или пароль');
        }
    }
    if (redirectTo) {
        history('/my_profile');
    }

    return (
        <div class='body-reg'>
            <div className='menu-reg' style={{position: 'absolute', height: '560px'}}></div>

            <NavLink exact to="/" className='text-brand'>SocialSphere</NavLink>
            <div className='text-reg'>Авторизация</div>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className={isEmailValid ? 'text-form' : 'text-form-invalid'}
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
                className='text-form'
                style={{position: 'absolute', top: '400px'}}
                value={password}
                onChange={handlePasswordChange}
            />

            <div onClick={submit}
                 className="button-registr"
                 style={{position: 'absolute', top: '510px'}}> Войти
            </div>

            <div className='text-in' style={{position: 'absolute', top: '600px', left: '834px'}}> У вас нет аккаунта?
            </div>

            <NavLink exact to="/register" className='text-in' style={{
                position: 'absolute',
                top: '600px',
                left: '976px',
                color: '#807EFF'
            }}>Зарегистрироваться</NavLink>

        </div>
    );
}

export default Authorization;