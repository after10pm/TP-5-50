import React, {useEffect, useRef, useState} from 'react';
import '../components/Register.css';
import {NavLink} from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import {useNavigate} from 'react-router-dom';
import {SyntheticEvent} from "react";
import {DateCalendar} from "@mui/x-date-pickers";


function Register() {
    const history = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectTo, setRedirect] = useState(false);
    const dateCalendarRef = useRef(null);

    const toggleDatePicker = (event) => {
        event.stopPropagation();
        setIsDatePickerShown(!isDatePickerShown);
    };


    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };
    useEffect(() => {
        console.log(isDatePickerShown);
    }, [isDatePickerShown]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dateCalendarRef.current &&
                !dateCalendarRef.current.contains(event.target) &&
                event.target.id !== 'datepicker'
            ) {
                setIsDatePickerShown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


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
            return date ? date.toISOString().split('T')[0] : null;
        };
        const formattedDate = selectedDate ? formatDate(selectedDate) : null;
        const response = await fetch('http://79.174.84.116:8000/register/', {
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
            <input
                type="text"
                id="datepicker"
                name="date"
                placeholder="Дата рождения"
                className='text-form'
                style={{position: 'absolute', top: '480px'}}
                value={selectedDate ? selectedDate.format('DD.MM.YYYY') : ''}
            />


            <input type="password" id="password" name="password" placeholder="Пароль" className='text-form'
                   style={{position: 'absolute', top: '570px'}}/>
            <input type="password" id="password-confirm" name="passwordConfirm" placeholder="Повторите пароль"
                   className='text-form' style={{position: 'absolute', top: '660px'}}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <input type="checkbox" id="agreeCheckBox" className='mark-reg-2'/>

            <div className='check-mark' onClick={(event) => toggleDatePicker(event)} style={{left: '1116.5px'}}/>

            {isDatePickerShown && (
                <div className="date-picker-container" ref={dateCalendarRef}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}.`}
                        />
                    </LocalizationProvider>
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