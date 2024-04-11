import React, {Component} from 'react';
import '../components/Register.css';

class Authorization extends Component {
    render() {
        return (
            <div class='body-reg'>
                <div className='menu-reg' style={{ position: 'absolute', height: '560px' }}></div>

                <div className='text-brand'>SocialSphere</div>
                <div className='text-reg'>Авторизация</div>
                <input type="text" id="email" name="email" placeholder="Email" className='text-form'/>
                <input type="text" id="password" name="password" placeholder="Пароль" className='text-form'
                       style={{position: 'absolute', top: '400px'}}/>
                <div className='button-registr' style={{position: 'absolute', top: '510px'}}>Зарегистрироваться</div>
                <div className='text-in' style={{position: 'absolute', top: '600px', left:'834px'}}> У вас нет аккаунта? Зарегистрироваться</div>

            </div>
        );
    }
}

export default Authorization;