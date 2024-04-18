import React, {Component} from 'react';
import "../components/Category.css";


class BlockCategory extends Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default BlockCategory;