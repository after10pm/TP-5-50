import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../components/Account.css';
import BlockAcc from "../components/BlockAcc";

class PersonalAccount extends Component {

    state = {
        isUnsubscribeVisible: false,
        isHovered: false
    }

    handleUnsubscribe = () => {
        this.setState({ isUnsubscribeVisible: !this.state.isUnsubscribeVisible });
    }
    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }
    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    }

    render() {
        return (
            <div className='header'>
                <NavLink exact to="/" className='brand'>SocialSphere</NavLink>
                <div className='button' style={{ position: 'absolute', left: '1660px', width: '215px' }}>0Nickname0</div>
                <div className='imgfs'></div>
                <BlockAcc />
                <NavLink exact to="/profileAuthor" className='button' style={{ position: 'absolute', left: '270px', top: '405px', width: '212px', height: '56px', backgroundColor: '#807EFF', color: "white", borderRadius: '75px' }}>Стать автором</NavLink>
                <div className='acc-block-2'></div>
                <div className='acc-text-3'>Подписки</div>

                {this.state.isUnsubscribeVisible ?
                    <div className='acc-button-unscribe' onClick={this.handleUnsubscribe} style={{backgroundColor: this.state.isHovered ? '#807EFF' : '#FF6F6F'}}>Подписаться</div> :
                    <div className='acc-button-info' onClick={this.handleUnsubscribe} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{backgroundColor: this.state.isHovered ? '#FF6F6F' : '', color:this.state.isHovered ? '#FFFFFF' : ''}}>
                        {this.state.isHovered ? 'Отписаться' : 'Вы подписаны'}
                    </div>
                }
                <NavLink exact to="/authorPage" className='acc-text-nick-another'>username</NavLink>
                <div className='imgfs-2'></div>


            </div>
        );
    }
}

export default PersonalAccount;