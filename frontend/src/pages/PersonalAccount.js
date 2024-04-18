import React, {Component} from 'react';
import {BrowserRouter, NavLink} from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

class PersonalAccount extends Component {
    render() {
        return (
            <div className='header'>
                <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>
                <BlockAcc/>
                <NavLink exact to="/blogEditing"  className='button' style={{position: 'absolute', left: '270px', top:'405px', width: '212px', height:'56px', backgroundColor:'#807EFF', color:"white", borderRadius:'75px'}}>Стать автором</NavLink>
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

export default PersonalAccount;