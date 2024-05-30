import React, {Component} from 'react';
import '../components/Admins.css'
import {NavLink} from "react-router-dom";
import axios from "axios";

class AdminAccounts extends Component {
    state = {
        details: [],
        searchText: '',
    };
    componentDidMount() {
        let data;
        axios.get("http://localhost:8000")
            .then(res =>{
                data = res.data;
                this.setState({
                    details: data
                });

            })
            .catch(err =>{
                console.log(err);
            })

    }

    handleBlockUser = (index) => {
        const user = this.state.details[index];
        if (!user.is_blocked) {
            axios.put(`http://localhost:8000/api/users/change/${user.id}/`, { action: 'block' })
                .then(response => {
                    const updatedDetails = this.state.details.map((user, i) => {
                        if (i === index) {
                            return { ...user, is_blocked: true }; // Обновляем значение is_blocked на true
                        }
                        return user;
                    });
                    this.setState({ details: updatedDetails });
                })
                .catch(error => {
                    console.error('Ошибка при блокировке пользователя:', error);
                });
        }
    }

    handleUnblockUser = (index) => {
        const user = this.state.details[index];

        axios.put(`http://localhost:8000/api/users/change/${user.id}/`, { action: 'unblock' })
            .then(response => {
                const updatedDetails = this.state.details.map((item, i) => {
                    if (i === index) {
                        return { ...item, is_blocked: false }; // Изменяем значение is_blocked на false
                    }
                    return item;
                });
                this.setState({ details: updatedDetails }); // Обновляем состояние компонента
            })
            .catch(error => {
                console.error('Ошибка при разблокировке пользователя:', error);
            });
    }
    handleDeleteUser = (index) => {
        const userToDelete = this.state.details[index];

        const confirmDelete = window.confirm(`Вы уверены, что хотите удалить пользователя "${userToDelete.name}"?`);

        if (confirmDelete) {
            axios.delete(`http://localhost:8000/api/users/delete/${userToDelete.id}/`)
                .then(response => {
                    const filteredDetails = this.state.details.filter((user, i) => i !== index);
                    this.setState({ details: filteredDetails });
                })
                .catch(error => {
                    console.error('Ошибка при удалении пользователя:', error);
                });
        }
    }
    handleChangeSearch = (event) => {
        this.setState({ searchText: event.target.value });
    }

    render() {
        const filteredUsers = this.state.details.filter(user => user.name.toLowerCase().includes(this.state.searchText.toLowerCase()));

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
                        <div className={user.is_blocked ? 'admins-text-user-blocked' : 'admins-text-user'}>{user.name}</div>
                        <div className='admins-img-3'></div>
                        <div className='admins-accounts-block' onClick={() => this.handleBlockUser(index)}>Заблокировать</div>
                        <div className='admins-accounts-unblock' onClick={() => this.handleUnblockUser(index)}>Разблокировать</div>
                        <div className='admins-accounts-delete' onClick={() => this.handleDeleteUser(index)}>Удалить</div>
                    </div>
                ))}

            </div>
        );
    }
}

export default AdminAccounts;