import React, {Component} from 'react';
import "../components/Category.css";
import BlockCategory from "../components/blockCategory";
import {NavLink} from "react-router-dom";

class Category extends Component {
    render() {
        return (
            <div>
                <div className='header'>
                    <NavLink exact to="/" className="brand">SocialSphere</NavLink>
                </div>

                <NavLink exact to="/profile" className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</NavLink>
                <div className='imgfs'></div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1865px', top: '27px', width:'9px', height:'9px'}}/>


               <BlockCategory/>
                <div className='category-main-text'>Категории</div>
            </div>

        );
    }
}

export default Category;