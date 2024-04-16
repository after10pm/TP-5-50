import React, {Component} from 'react';
import "../components/Category.css";

class Category extends Component {
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1865px', top: '27px', width:'9px', height:'9px'}}/>

                <div className='category-block'></div>

                <div className='category-main-text'>Категории</div>

                <input type="text" id="search" name="search" placeholder="Поиск" className='category-search'/>

                <div className='category-letter'>A</div>
                <div className='category-word'>арбуз</div>
                <div className='category-word' style={{top:'365px'}}>абрикос</div>
                <div className='category-word' style={{top:'389px'}}>атлас</div>
                <div className='category-word' style={{top:'413px'}}>анимация</div>
                <div className='category-word' style={{top:'437px'}}>ахтунг</div>

                <div className='category-letter' style={{top:'500px'}}>Б</div>
                <div className='container' style={{position:"absolute", top:'195px'}}>
                    <div className='category-word' style={{top:'365px'}}>абрикос</div>
                    <div className='category-word' style={{top:'389px'}}>атлас</div>
                    <div className='category-word' style={{top:'413px'}}>анимация</div>
                    <div className='category-word' style={{top:'437px'}}>ахтунг</div>
                </div>
                <div className='category-letter' style={{top:'700px'}}>В</div>
                <div className='container' style={{position:"absolute", top:'396px'}}>
                    <div className='category-word' style={{top:'365px'}}>абрикос</div>
                    <div className='category-word' style={{top:'389px'}}>атлас</div>
                    <div className='category-word' style={{top:'413px'}}>анимация</div>
                    <div className='category-word' style={{top:'437px'}}>ахтунг</div>
                </div>
            </div>
        );
    }
}

export default Category;