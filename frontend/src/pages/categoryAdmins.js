import React, {Component} from 'react';
import BlockCategory from "../components/blockCategory";
import {NavLink} from "react-router-dom";

class CategoryAdmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {
                A: ['арбуз', 'абрикос', 'атлас', 'анимация', 'ахтунг'],
                B: ['арбуз', 'абрикос', 'атлас', 'анимация', 'ахтунг'],
                В: ['арбуз', 'абрикос', 'атлас', 'анимация', 'ахтунг']
            },
            newCategory: ''
        }
    }

    handleAddCategory = () => {
        const { categories, newCategory } = this.state;
        const firstLetter = newCategory.charAt(0).toUpperCase();
        if (categories[firstLetter]) {
            this.setState(prevState => ({
                categories: {
                    ...prevState.categories,
                    [firstLetter]: [...prevState.categories[firstLetter], newCategory]
                },
                newCategory: ''
            }));
        }
    }

    handleCategoryChange = (e) => {
        this.setState({ newCategory: e.target.value });
    }
    render() {
        return (
            <div>
                <div className='header'>
                    <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                    <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
                    <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                    <div className='account-check-mark' style={{left: '1866.5px', top: '30px', width:'6px', height:'6px'}}/>
                    <div className='admins-fon'>
                        <div className='admins-img'/>
                        <div className='admins-img-2'/>
                    </div>
                </div>


                <div className='category-block'></div>



                <input type="text" id="search" name="search" placeholder="Поиск" className='category-search'/>

                <div className='category-letter'>A</div>
                <div className='category-word'>арбуз</div>
                <div className='category-word' style={{top:'365px'}}>абрикос</div>
                <div className='category-word' style={{top:'389px'}}>атлас</div>
                <div className='category-word' style={{top:'413px'}}>анимация</div>
                <div className='category-word' style={{top:'437px'}}>ахтунг</div>

                <div className='category-letter' style={{top:'500px'}}>Б</div>
                <div style={{position:"absolute", top:'195px'}}>
                    <div className='category-word' style={{top:'365px'}}>абрикос</div>
                    <div className='category-word' style={{top:'389px'}}>атлас</div>
                    <div className='category-word' style={{top:'413px'}}>анимация</div>
                    <div className='category-word' style={{top:'437px'}}>ахтунг</div>
                </div>
                <div className='category-letter' style={{top:'700px'}}>В</div>
                <div style={{position:"absolute", top:'396px'}}>
                    <div className='category-word' style={{top:'365px'}}>абрикос</div>
                    <div className='category-word' style={{top:'389px'}}>атлас</div>
                    <div className='category-word' style={{top:'413px'}}>анимация</div>
                    <div className='category-word' style={{top:'437px'}}>ахтунг</div>
                </div>



                <div className='admins-add-category'>Добавить категорию</div>
                <div className='category-main-text' style={{width:'500px'}}>Изменение категорий</div>
                <div className='admins-add-category' style={{backgroundColor:'#FF6F6F', top:'297px'}}>Удалить категорию</div>

                <input type="text" id="new_category" name="new_category" placeholder='Категория' className='admins-add-category-input'/>



            </div>
        );
    }
}

export default CategoryAdmins;