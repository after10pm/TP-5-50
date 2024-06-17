import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import {Navigate, NavLink} from "react-router-dom";
import '../components/Admins.css'

function AdminAccounts(props) {
    const [details, setDetails] = useState([]);
    const [searchText, setSearchText] = useState('');
    const user = props.user;
    const [isLoading, setIsLoading] = useState(true);


    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users/');
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const data = await response.json();

            setDetails(data)

        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleBlockUser = (index) => {
        const user = details[index];
        if (!user.is_blocked) {
            axios.put(`http://localhost:8000/users/change/${user.id}/`, {action: 'block'})
                .then(response => {
                    const updatedDetails = details.map((user, i) => {
                        if (i === index) {
                            return {...user, is_blocked: true};
                        }
                        return user;
                    });
                    setDetails(updatedDetails);
                })
                .catch(error => {
                    console.error('Ошибка при блокировке пользователя:', error);
                });
        }
    };

    const handleUnblockUser = (index) => {
        const user = details[index];
        axios.put(`http://localhost:8000/users/change/${user.id}/`, {action: 'unblock'})
            .then(response => {
                const updatedDetails = details.map((item, i) => {
                    if (i === index) {
                        return {...item, is_blocked: false};
                    }
                    return item;
                });
                setDetails(updatedDetails);
            })
            .catch(error => {
                console.error('Ошибка при разблокировке пользователя:', error);
            });
    };

    const handleDeleteUser = (index) => {
        const userToDelete = details[index];
        const confirmDelete = window.confirm(`Вы уверены, что хотите удалить пользователя "${userToDelete.name}"?`);

        if (confirmDelete) {
            axios.delete(`http://localhost:8000/api/users/delete/${userToDelete.id}/`)
                .then(response => {
                    const filteredDetails = details.filter((user, i) => i !== index);
                    setDetails(filteredDetails);
                })
                .catch(error => {
                    console.error('Ошибка при удалении пользователя:', error);
                });
        }
    };

    const handleChangeSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredUsers = details.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));
    if (user === '') {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )
        } else {
            return (
                <div>
                    <Navigate to={"/authorization"}/>
                </div>
            )

        }

    } else {
        if (user.is_staff) {
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
                    <input type="text" value={searchText} onChange={handleChangeSearch} placeholder="Поиск" className='category-search' style={{ width: '395px' }} />
                    {filteredUsers.map((user, index) => (
                        <div key={index} className='container' style={{ position: "absolute", top: 38 + 38 * index + 'px' }}>
                            {index % 2 === 0 && <div className='admins-accounts-color'></div>}
                            <div className={user.is_blocked ? 'admins-text-user-blocked' : 'admins-text-user'}>{user.name}</div>
                            <div className='admins-img-3'></div>
                            <div className='admins-accounts-block' onClick={() => handleBlockUser(index)}>Заблокировать</div>
                            <div className='admins-accounts-unblock' onClick={() => handleUnblockUser(index)}>Разблокировать</div>
                            <div className='admins-accounts-delete' onClick={() => handleDeleteUser(index)}>Удалить</div>
                        </div>
                    ))}

                </div>
            );

        } else{
            return (
                <div>
                    <Navigate to={"/my_profile"}/>
                </div>
            )
        }



    }


}

export default AdminAccounts;