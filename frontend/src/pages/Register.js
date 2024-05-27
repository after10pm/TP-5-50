import React, {useState} from 'react';
import '../components/Register.css';
import {NavLink} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import alert from "bootstrap/js/src/alert";

import {useNavigate} from 'react-router-dom';
import {SyntheticEvent} from "react";


function Register() {
    const history = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectTo, setRedirect] = useState(false);


    const toggleDatePicker = () => {
        setIsDatePickerShown(!isDatePickerShown);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("password-confirm").value;

        if (!email || !name || !password || !confirmPassword) {
            window.alert('Не должно быть пустых полей');
            return;
        }

        if (password !== confirmPassword) {
            window.alert('Пароли не совпадают. Пожалуйста, убедитесь, что пароли совпадают.');
            return;
        }
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const formattedDate = selectedDate ? formatDate(selectedDate) : null;
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
                date_of_birth: formattedDate
            })
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            window.alert('Неправильный email или пароль');
        }
    }


    if (redirectTo) {
        history('/authorization');
    }

    return (
        <div className='body-reg'>
            <div className='menu-reg'></div>

            <NavLink exact to="/" className='text-brand'>SocialSphere</NavLink>
            <div className='text-reg'>Регистрация</div>
            <input type="text" id="email" name="email" placeholder="Email" className='text-form'/>
            <input type="text" id="name" name="name" placeholder="Никнейм" className='text-form'
                   style={{position: 'absolute', top: '390px'}}/>
            <input type="text" id="datepicker" name="date" placeholder="Дата рождения" className='text-form'
                   style={{position: 'absolute', top: '480px'}}
                   value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : ''}/>


            <input type="password" id="password" name="password" placeholder="Пароль" className='text-form'
                   style={{position: 'absolute', top: '570px'}}/>
            <input type="password" id="password-confirm" name="passwordConfirm" placeholder="Повторите пароль"
                   className='text-form' style={{position: 'absolute', top: '660px'}}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <input type="checkbox" id="agreeCheckBox" className='mark-reg-2'/>

            <div className='check-mark' onClick={toggleDatePicker} style={{left: '1116.5px'}}/>
            {isDatePickerShown && (
                <div className='date-picker-container'>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                    />
                </div>
            )}

            <div className="text-conf">
                Регистрируясь на сайте, вы принимаете условия оказания услуг, условия платежей, политику
                конфиденциальности и политику файлов cookie
            </div>
            <div className='text-in'> У вас есть аккаунт?</div>

            <NavLink exact to="/authorization" className='text-in'
                     style={{left: '1020px', color: '#807EFF'}}>Войти</NavLink>
            <div className='button-registr' onClick={submit}>Зарегистрироваться</div>
        </div>
    );
}


export default Register;