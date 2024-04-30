import React, {useState} from 'react';
import '../components/Register.css';
import {NavLink} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Register() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);

    const toggleDatePicker = () => {
        setIsDatePickerShown(!isDatePickerShown);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <div className='body-reg'>
            <div className='menu-reg'></div>

            <NavLink exact to="/" className='text-brand'>SocialSphere</NavLink>
            <div className='text-reg'>Регистрация</div>
            <input type="text" id="email" name="email" placeholder="Email" className='text-form'/>
            <input type="text" id="name" name="name" placeholder="Никнейм" className='text-form' style={{position: 'absolute', top: '390px'}}/>
            <input type="text" id="datepicker" name="date" placeholder="Дата рождения" className='text-form' style={{position: 'absolute', top: '480px'}} readOnly value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : ''} />


            <input type="text" id="password" name="password" placeholder="Пароль" className='text-form' style={{position: 'absolute', top: '570px'}}/>
            <input type="text" id="password" name="password" placeholder="Повторите пароль" className='text-form' style={{position: 'absolute', top: '660px'}}/>

            <input type="checkbox" id="agreeCheckBox"  className='mark-reg-2'/>

            <div className='check-mark' onClick={toggleDatePicker} style={{left:'1116.5px'}}/>
            {isDatePickerShown && (
                <div className='date-picker-container'>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                    />
                </div>
            )}

            <div className="text-conf">
                Регистрируясь на сайте, вы принимаете условия оказания услуг, условия платежей, политику
                конфиденциальности и политику файлов cookie
            </div>
            <div className='text-in'> У вас есть аккаунт?</div>

            <NavLink exact to="/authorization" className='text-in' style={{left:'1020px', color:'#807EFF'}}>Войти</NavLink>

            <div className='button-registr'>Зарегистрироваться</div>
        </div>
    );
}


export default Register;