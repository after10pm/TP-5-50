import React, {Component} from 'react';
import './Fotter.css'
import {NavLink} from "react-router-dom";
export default class Fotter extends Component {
    render() {
        return (
            <div>
                <NavLink exact to="/rules" className='fot'>Ознакомиться с правилами сайта</NavLink>

                <NavLink exact to="/ServicePanel" className='fot' style={{left:'-1750px'}}>Служебная панель</NavLink>
            </div>
        );
    }
}
