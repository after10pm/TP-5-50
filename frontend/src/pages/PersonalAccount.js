import React, {Component} from 'react';
import {BrowserRouter, NavLink} from "react-router-dom";
import '../components/Account.css';

class PersonalAccount extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='header'>
                    <p className='brand'>SocialSphere</p>
                    <div className='button' style={{position: 'absolute', left: '1660px', width:'215px'}}>0Nickname0</div>
                    <div className='imgfs'></div>
                    <div className='block-acc'></div>
                    <div className='imgfs' style={{position:'absolute', left:'353px', top:'160px', width:'160px', height:'160px'}}></div>
                </div>
            </BrowserRouter>
        );
    }
}

export default PersonalAccount;