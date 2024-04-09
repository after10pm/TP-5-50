import React, {Component} from 'react';
import '../components/Register.css';


function Register() {
    const toggleCheckbox = () => {
        var checkbox = document.getElementById("agreeCheckBox");
        checkbox.checked = !checkbox.checked;
    };

    return (
        <div className='body-reg'>
            <div className='menu-reg'></div>

            <div className='text-brand'>SocialSphere</div>
            <div className='text-reg'>Регистрация</div>
            <input type="text" id="email" name="email" placeholder="Email" className='text-form'/>
            <input type="text" id="name" name="name" placeholder="Никнейм" className='text-form'
                   style={{position: 'absolute', top: '390px'}}/>
            <input type="text" id="date" name="date" placeholder="Дата рождения" className='text-form'
                   style={{position: 'absolute', top: '480px'}}/>

            <input type="text" id="password" name="password" placeholder="Пароль" className='text-form'
                   style={{position: 'absolute', top: '570px'}}/>
            <input type="text" id="password" name="password" placeholder="Повторите пароль" className='text-form'
                   style={{position: 'absolute', top: '660px'}}/>
            <div className='rec'></div>
            <div className='mark-reg'></div>
            <input type="checkbox" id="agreeCheckBox" onClick={toggleCheckbox} className='mark-reg-2'/>

            <div className='check-mark'/>
            <div className="text-conf">
                Регистрируясь на сайте, вы принимаете условия оказания услуг, условия платежей, политику
                конфиденциальности и политику файлов cookie
            </div>
            <div className='text-in'> У вас есть аккаунт? Войти</div>

            <div className='button-registr'>Зарегистрироваться</div>


        </div>
    );

}


export default Register;