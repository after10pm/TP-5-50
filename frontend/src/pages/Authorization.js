import React, {Component, useEffect, useState} from 'react';
import '../components/Register.css';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function Authorization (props)  {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [details, setDetails] = useState([]);

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

    const handleClick = () => {
        const user = details.find(user => user.email === email && user.password === password);
        if (!user) {
            window.alert('Неправильная почта или пароль');
        } else {
            history('/profile', { state: { user } });
        }
    };


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

            <div onClick={handleClick}
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