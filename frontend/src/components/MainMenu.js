import React, {Component} from 'react';
import './mainMenu.css'
import {NavLink} from "react-router-dom";
export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCategories: false,
            showRegister: true,

            elipse1Color: '#807EFF',
            elipse2Color: '#D9D9D9'
        }
    }

    handleEllipseClick = () => {
        this.setState((prevState) => ({
            showCategories: prevState.showRegister,
            showRegister: prevState.showCategories,
            elipse1Color: prevState.elipse2Color,
            elipse2Color: prevState.elipse1Color
        }));
    };

    handleEllipse1Click = () => {
        this.setState({
            showCategories: false,
            showRegister: true,
            elipse1Color: '#807EFF',
            elipse2Color: '#D9D9D9'
        });
    };

    render() {
        return (
            <div className='mainblock'>
                <div className='brand-s'>SocialSphere</div>
                {/*<NavLink exact to="/" className="brand-s">SocialSphere</NavLink>*/}
                <img src="https://i.ibb.co/NrCKPLD/app1.png"  style={{position: 'absolute', top: '145px', left: '178px'}} />
                <div className='text1'>В сфере ваших интересов</div>
                <div className='text2'>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях....</div>
                {this.state.showRegister &&
                    <NavLink exact to="/register" className="regs">Регистрация</NavLink>
                }

                {this.state.showCategories &&
                    <NavLink exact to="/category" className="regs">Категории</NavLink>
                }
                <div className='elipse1' onClick={this.handleEllipse1Click} style={{backgroundColor: this.state.elipse1Color}}></div>
                <div className='elipse2' onClick={this.handleEllipseClick} style={{backgroundColor: this.state.elipse2Color}}></div>


                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '895px' }}></div>
                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '940px' }}></div>
                <div className='elipse2' style={{ position: 'absolute', top: '600px', left: '985px' }}></div>
            </div>
        );
    }
}
