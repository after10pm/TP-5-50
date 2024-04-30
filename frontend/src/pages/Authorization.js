import React, {Component} from 'react';
import '../components/Register.css';
import {NavLink} from "react-router-dom";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
class Authorization extends Component {
    state = {
        email: '',
        password: '',
        isEmailValid: true,
        isPasswordValid: false
    };
    handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const isValidEmail = EMAIL_REGEXP.test(emailValue);
        this.setState({ email: emailValue, isEmailValid: isValidEmail });
    }

    handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        const isValidPassword = passwordValue.length >= 6;
        this.setState({ password: passwordValue, isPasswordValid: isValidPassword });
    }
    handleClick = (e) => {
        const { isEmailValid, isPasswordValid } = this.state;
        if(!isEmailValid || !isPasswordValid) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div class='body-reg'>
                <div className='menu-reg' style={{ position: 'absolute', height: '560px' }}></div>

                <NavLink exact to="/" className='text-brand'>SocialSphere</NavLink>
                <div className='text-reg'>Авторизация</div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={this.state.isEmailValid ? 'text-form' : 'text-form-invalid'}
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    className='text-form'
                    style={{position: 'absolute', top: '400px'}}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />


                <NavLink
                    onClick={this.handleClick}
                    className="button-registr"
                    to="/profile"
                    style={{position: 'absolute', top: '510px'}}
                >
                    Войти
                </NavLink>
                <div className='text-in' style={{position: 'absolute', top: '600px', left:'834px'}}> У вас нет аккаунта?</div>

                <NavLink exact to="/register" className='text-in' style={{position: 'absolute', top: '600px', left:'976px', color:'#807EFF'}}>Зарегистрироваться</NavLink>

            </div>
        );
    }
}

export default Authorization;