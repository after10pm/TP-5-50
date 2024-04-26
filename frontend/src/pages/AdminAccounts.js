import React, {Component} from 'react';
import '../components/Admins.css'
import {NavLink} from "react-router-dom";

class AdminAccounts extends Component {
    state = {
        users: [
            { username: 'username1', isBlocked: false },
            { username: 'username2', isBlocked: false },
            { username: 'username3', isBlocked: false },
            { username: 'dsadas', isBlocked: false },
            { username: 'username5', isBlocked: false }
        ],
        searchText: ''
    }

    handleBlockUser = (index) => {
        const userToBlock = this.state.users[index];
        if (!userToBlock.isBlocked) {
            const updatedUsers = this.state.users.map((user, i) => {
                if (i === index) {
                    return { ...user, isBlocked: true };
                }
                return user;
            });

            this.setState({ users: updatedUsers });
        }
    }

    handleUnblockUser = (index) => {
        const updatedUsers = this.state.users.map((user, i) => {
            if (i === index) {
                return { ...user, isBlocked: false };
            }
            return user;
        });

        this.setState({ users: updatedUsers });
    }

    handleChangeSearch = (event) => {
        this.setState({ searchText: event.target.value });
    }

    render() {
        const filteredUsers = this.state.users.filter(user => user.username.toLowerCase().includes(this.state.searchText.toLowerCase()));
        return (
            <div className='header'>
                <NavLink exact to="/" className='brand'>SocialSphere</NavLink>

                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1866.5px', top: '30px', width:'6px', height:'6px'}}/>

                <div className='admins-fon'>
                    <div className='admins-img' />
                    <div className='admins-img-2' />
                </div>
                <div className='admins-block' />
                <div className='admins-block-text'>Аккаунты пользователей</div>
                <input type="text" value={this.state.searchText} onChange={this.handleChangeSearch} placeholder="Поиск" className='category-search' style={{ width: '395px' }} />
                {filteredUsers.map((user, index) => (
                    <div key={index} className='container' style={{ position: "absolute", top: 38 + 38 * index + 'px' }}>
                        {index % 2 === 0 && <div className='admins-accounts-color'></div>}
                        <div className={user.isBlocked ? 'admins-text-user-blocked' : 'admins-text-user'}>{user.username}</div>
                        <div className='admins-img-3'></div>
                        <div className='admins-accounts-block' onClick={() => this.handleBlockUser(index)}>Заблокировать</div>
                        <div className='admins-accounts-unblock' onClick={() => this.handleUnblockUser(index)}>Разблокировать</div>
                        <div className='admins-accounts-delete'>Удалить</div>
                    </div>
                ))}

            </div>
        );
    }
}

export default AdminAccounts;