import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class PersonalAccountAuthor extends Component {
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>
                <div className='block-acc'></div>
                <div className='imgfs'
                     style={{position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px'}}></div>
                <div className='acc-text-nick'>0Nickname0</div>
                <div className='acc-text-email'>email.email@mail.ru</div>
                <NavLink exact to="/blogEditing" className='button' style={{position: 'absolute', left: '256px', top:'405px', width: '235px', height:'56px', backgroundColor:'#807EFF', color:"white", borderRadius:'75px'}}>Редактирование блога</NavLink>
                <div className='acc-text-2'>Изменить данные</div>


                <div className='acc-block-2'></div>
                <div className='acc-text-3'>Подписки</div>

                <div className='acc-button-unscribe'>Отписаться</div>
                <div className='acc-text-nick-another'>username</div>
                <div className='imgfs-2'></div>

                <div className='acc-button-info' style={{top:'340px'}}>Вы подписаны</div>
                <div className='acc-text-nick-another' style={{top:'340px'}}>username</div>
                <div className='imgfs-2' style={{top:'325px'}}></div>
                {/*<div className='acc-text-nick-another'>username</div>*/}
                {/*<div className='imgfs-2'></div>*/}

            </div>
        );
    }
}

export default PersonalAccountAuthor;