import React, {Component} from 'react';
import BlockCategory from "../components/blockCategory";
import {NavLink} from "react-router-dom";

class CategoryAdmins extends Component {
    constructor(props) {
        super(props);
        const categories = {
            А: ['арбуз', 'абрикос', 'атлас', 'анимация', 'ахтунг'],
            Б: ['блог', 'бензин', 'берлога', 'бактерия', 'бенефит'],
            В: ['вагон', 'вакуум', 'вклад', 'вояж', 'валидация']
        };
        this.state = {
            categories: categories,
            allWords: Object.values(categories).flat(),
            searchResults: {
                А: categories.А,
                Б: categories.Б,
                В: categories.В
            },
            newCategory: ''
        };

    }

    handleChangeSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const { categories } = this.state;
        const searchResults = {
            А: categories.А.filter(word => word.toLowerCase().includes(searchTerm)),
            Б: categories.Б.filter(word => word.toLowerCase().includes(searchTerm)),
            В: categories.В.filter(word => word.toLowerCase().includes(searchTerm))
        };
        this.setState({ searchResults });
    };

    addCategory = () => {
        const { categories, newCategory } = this.state;
        if (newCategory.trim() === '') {
            return;
        }

        const selectedLetter = newCategory.charAt(0).toUpperCase();

        if (categories[selectedLetter]) {
            categories[selectedLetter].push(newCategory);
            this.setState({
                categories: categories,
                allWords: Object.values(categories).flat(),
                searchResults: {
                    А: categories.А,
                    Б: categories.Б,
                    В: categories.В
                },
                newCategory: ''
            });
        }
    };

    handleChangeNewCategory = (event) => {
        this.setState({ newCategory: event.target.value });
    };
    deleteCategory = (letter, word) => {
        const { categories } = this.state;
        categories[letter] = categories[letter].filter(category => category !== word);

        this.setState({
            categories: categories,
            allWords: Object.values(categories).flat(),
            searchResults: {
                А: categories.А,
                Б: categories.Б,
                В: categories.В
            }
        });
    };

    render() {
        const { searchResults, newCategory } = this.state;
        return (
            <div>
                <div className='header'>
                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
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


                <input type="text" onChange={this.handleChangeSearch} placeholder="Поиск" className='category-search'/>

                <div className='category-letter'>A</div>
                {searchResults.А.map((word, index) => (
                    <div key={`А-${index}`} className='category-word' style={{ top: 340 + 25 * index + 'px' }} onClick={() => this.deleteCategory('А', word)}>
                        {word}
                    </div>
                ))}

                <div className='category-letter' style={{ top: '480px' }}>Б</div>
                {searchResults.Б.map((word, index) => (
                    <div key={`Б-${index}`} className='category-word' style={{ top: 555 + 25 * index + 'px' }} onClick={() => this.deleteCategory('Б', word)}>
                        {word}
                    </div>
                ))}

                <div className='category-letter' style={{ top: '700px' }}>В</div>
                {searchResults.В.map((word, index) => (
                    <div key={`В-${index}`} className='category-word' style={{ top: 770 + 25 * index + 'px' }} onClick={() => this.deleteCategory('В', word)}>
                        {word}
                    </div>
                ))}


                <button onClick={this.addCategory} className='admins-add-category'>Добавить категорию</button>
                <div className='category-main-text' style={{width: '500px'}}>Изменение категорий</div>
                <div className='admins-add-category' style={{backgroundColor: '#FF6F6F', top: '297px'}}>Удалить
                    категорию
                </div>

                <input type="text" value={newCategory} onChange={this.handleChangeNewCategory} placeholder="Новая категория" className='admins-add-category-input'/>
            </div>
        );
    }
}

export default CategoryAdmins;