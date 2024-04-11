import React, {Component} from 'react';
import './mainMenu.css'
import {NavLink} from "react-router-dom";
export default class MainMenu extends Component {
    render() {
        return (
            <div className='mainblock'>
                <div className='brand-s'>SocialSphere</div>
                <img src="https://i.ibb.co/NrCKPLD/app1.png"  style={{position: 'absolute', top: '145px', left: '178px'}} />
                <div className='text1'>В сфере ваших интересов</div>
                <div className='text2'>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях....</div>
                <NavLink exact to="/register" className="regs">Регистрация</NavLink>
                <div className='elipse1'></div>
                <div className='elipse2'></div>
                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '895px' }}></div>
                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '940px' }}></div>
                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '985px' }}></div>
            </div>

        );
    }
}
