import React, {Component} from 'react';
import '../components/Register.css';
function Register() {

    return (
        <div className='body-reg'>
            <div className='menu-reg'></div>
            <div className='text-brand'>SocialSphere</div>
            <div className='text-reg'>Регистрация</div>
            <input type="text" id="name" name="name" placeholder="Email" className='text-form' />
        </div>
    );

}

export default Register;