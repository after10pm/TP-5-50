import React, {Component, useEffect, useState} from 'react';
import BlockCategory from "../components/blockCategory";
import {Navigate, NavLink} from "react-router-dom";
import LoadingAnimation from "../animaiton/LoadingAnimation";
import {getAccessTokenFromCookies} from "../components/CookiesUtils";

const CategoryAdmins = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const user = props.user


    const categories = {
        'А': ['арбуз', 'абрикос', 'атлас', 'анимация', 'ахтунг'],
        'Б': ['блог', 'бензин', 'берлога', 'бактерия', 'бенефит'],
        'В': ['вагон', 'вакуум', 'вклад', 'вояж', 'валидация']
    };

    const [state, setState] = useState({
        categories: categories,
        allWords: Object.values(categories).flat(),
        searchResults: {
            'А': categories.А,
            'Б': categories.Б,
            'В': categories.В
        },
        newCategory: ''
    });

    const handleChangeSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const {categories} = state;
        const searchResults = {
            'А': categories.А.filter(word => word.toLowerCase().includes(searchTerm)),
            'Б': categories.Б.filter(word => word.toLowerCase().includes(searchTerm)),
            'В': categories.В.filter(word => word.toLowerCase().includes(searchTerm))
        };
        setState({...state, searchResults});
    };

    const addCategory = () => {
        const {categories, newCategory} = state;
        if (newCategory.trim() === '') {
            return;
        }

        const selectedLetter = newCategory.charAt(0).toUpperCase();

        if (categories[selectedLetter]) {
            categories[selectedLetter].push(newCategory);
            setState({
                categories: categories,
                allWords: Object.values(categories).flat(), 
                searchResults: {
                    'А': categories.А,
                    'Б': categories.Б,
                    'В': categories.В
                },
                newCategory: ''
            });
        }
    };

    const handleChangeNewCategory = (event) => {
        setState({...state, newCategory: event.target.value});
    };

    const deleteCategory = (letter, word) => {
        const {categories} = state;
        categories[letter] = categories[letter].filter(category => category !== word);

        setState({
            categories: categories,
            allWords: Object.values(categories).flat(),
            searchResults: {
                'А': categories.А,
                'Б': categories.Б,
                'В': categories.В
            }
        });
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);
    const logout = async () => {
        const accessToken = getAccessTokenFromCookies();
        await fetch('http://localhost:8000/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Включение токена доступа в заголовке
            },
            credentials: 'include',
        });
        window.location.reload()
    }

    const {searchResults, newCategory} = this.state;

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
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )

        } else {
            return (

                <div>
                    <div className='header'>
                        <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                        <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin
                        </div>
                        <div className='rec' style={{
                            left: '1860px',
                            top: '25px',
                            backgroundColor: '#DFDEFF',
                            width: '21px',
                            height: '21px'
                        }}></div>
                        <div className='account-check-mark'
                             style={{left: '1866.5px', top: '30px', width: '6px', height: '6px'}}/>
                        <div className='admins-fon'>
                            <div className='admins-img'/>
                            <div className='admins-img-2'/>
                        </div>
                    </div>


                    <div className='category-block'></div>


                    <input type="text" onChange={this.handleChangeSearch} placeholder="Поиск"
                           className='category-search'/>

                    <div className='category-letter'>A</div>
                    {searchResults.А.map((word, index) => (
                        <div key={`А-${index}`} className='category-word' style={{top: 340 + 25 * index + 'px'}}
                             onClick={() => deleteCategory('А', word)}>
                            {word}
                        </div>
                    ))}

                    <div className='category-letter' style={{top: '480px'}}>Б</div>
                    {searchResults.Б.map((word, index) => (
                        <div key={`Б-${index}`} className='category-word' style={{top: 555 + 25 * index + 'px'}}
                             onClick={() => deleteCategory('Б', word)}>
                            {word}
                        </div>
                    ))}

                    <div className='category-letter' style={{top: '700px'}}>В</div>
                    {searchResults.В.map((word, index) => (
                        <div key={`В-${index}`} className='category-word' style={{top: 770 + 25 * index + 'px'}}
                             onClick={() => deleteCategory('В', word)}>
                            {word}
                        </div>
                    ))}


                    <button onClick={addCategory} className='admins-add-category'>Добавить категорию</button>
                    <div className='category-main-text' style={{width: '500px'}}>Изменение категорий</div>
                    <div className='admins-add-category' style={{backgroundColor: '#FF6F6F', top: '297px'}}>Удалить
                        категорию
                    </div>

                    <input type="text" value={newCategory} onChange={handleChangeNewCategory}
                           placeholder="Новая категория"
                           className='admins-add-category-input'/>
                </div>
            );
        }
    }
}

export default CategoryAdmins;