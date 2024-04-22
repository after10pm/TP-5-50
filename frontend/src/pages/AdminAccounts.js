import React, {Component} from 'react';
import '../components/Admins.css'
import {NavLink} from "react-router-dom";

class AdminAccounts extends Component {
    render() {
        return (
            <div className='header'>
                <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1866.5px', top: '30px', width:'6px', height:'6px'}}/>


                <div className='admins-fon'>
                    <div className='admins-img'/>
                    <div className='admins-img-2'/>
                </div>
                <div className='admins-block'/>
                <div className='admins-block-text'>Аккаунты пользователей</div>
                <input type="text" id="search" name="search" placeholder="Поиск" className='category-search' style={{width:'395px'}}/>



                <div className='admins-accounts-color'></div>


                <div className='admins-text-user'>username</div>
                <div className='admins-img-3'></div>
                <div className='admins-accounts-block'>Заблокировать</div>
                <div className='admins-accounts-unblock'>Разблокировать</div>
                <div className='admins-accounts-delete'>Удалить</div>

                <div className='container' style={{position:"absolute", top:'38px'}}>
                    <div className='admins-text-user'>username</div>
                    <div className='admins-img-3'></div>
                    <div className='admins-accounts-block'>Заблокировать</div>
                    <div className='admins-accounts-unblock'>Разблокировать</div>
                    <div className='admins-accounts-delete'>Удалить</div>
                </div>

                <div className='admins-accounts-color' style={{top:'367px'}}></div>
                <div className='container' style={{position:"absolute", top:'76px'}}>
                    <div className='admins-text-user'>username</div>
                    <div className='admins-img-3'></div>
                    <div className='admins-accounts-block'>Заблокировать</div>
                    <div className='admins-accounts-unblock'>Разблокировать</div>
                    <div className='admins-accounts-delete'>Удалить</div>
                </div>

                <div className='container' style={{position:"absolute", top:'114px'}}>
                    <div className='admins-text-user'>username</div>
                    <div className='admins-img-3'></div>
                    <div className='admins-accounts-block'>Заблокировать</div>
                    <div className='admins-accounts-unblock'>Разблокировать</div>
                    <div className='admins-accounts-delete'>Удалить</div>
                </div>

                <div className='admins-accounts-color' style={{top:'443px'}}></div>
                <div className='container' style={{position:"absolute", top:'152px'}}>
                    <div className='admins-text-user'>username</div>
                    <div className='admins-img-3'></div>
                    <div className='admins-accounts-block'>Заблокировать</div>
                    <div className='admins-accounts-unblock'>Разблокировать</div>
                    <div className='admins-accounts-delete'>Удалить</div>
                </div>




            </div>
        );
    }
}

export default AdminAccounts;