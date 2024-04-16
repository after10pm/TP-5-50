import React, {Component, useState} from 'react';
import "../components/AuthorPage.css";
import Post from "../components/Post";


class AuthorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
        };
    }

    toggleSubscribed = () => {
        this.setState(prevState => ({ subscribed: !prevState.subscribed }));
    }
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1865px', top: '27px', width:'9px', height:'9px'}}/>


                <div className='account-block'></div>
                <div className='account-header'></div>
                <div className={`account-button ${this.state.subscribed ? 'subscribed' : ''}`} onClick={this.toggleSubscribed}>
                    {this.state.subscribed ? 'Отписаться' : 'Подписаться'}
                </div>
                <div className='account-img'></div>
                <div className='account-text-username'>username</div>
                <div className='acc-block-2' style={{top:'477px', left:'440px', width:'1026px'}}></div>

                <div className='container' style={{position: 'absolute', top: '260px', left:'-120px'}}>
                    <div className='change-block-acc'></div>
                    <div className='account-img' style={{left: '790px', top:'265px', width:'27px',height:'27px'}}></div>
                    <div className='acc-text-4'>username</div>
                    <div className='imgfs-3'></div>
                    <div className='acc-text-5'>Название поста 1</div>
                    <div className='text-under-post'>
                        Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.
                        Дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы.
                    </div>
                    <div className='date-post'>18:01 21.08.2024</div>
                    <div className='heart' style={{left:'1210px', top:'282px'}}></div>
                    <div className='number-likes' style={{top:'282px',left:'1235px'}}>1000</div>
                    <div className='comments'style={{top:'282px',left:'1335px'}}>93</div>

                    <div className='account-text-read'>Читать далее...</div>

                    <div className='rec' style={{left: '805px', top: '706px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                    <div className='account-check-mark'/>

                </div>
                <div className='container' style={{position: 'absolute', top: '780px', left:'-120px'}}>
                    <div className='change-block-acc' style={{height:'528px'}}></div>
                    <div className='account-img' style={{left: '790px', top:'265px', width:'27px',height:'27px'}}></div>
                    <div className='acc-text-4'>username</div>
                    <div className='imgfs-3'></div>
                    <div className='acc-text-5'>Мои идейные соображения</div>
                    <div className='text-under-post'>
                        Идейные соображения высшего порядка, а также сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития.
                    </div>
                    <div className='date-post' style={{top:'650px'}}>18:01 21.08.2024</div>
                    <div className='heart' style={{left:'1210px', top:'282px'}}></div>
                    <div className='number-likes' style={{top:'282px',left:'1235px'}}>1000</div>
                    <div className='comments'style={{top:'282px',left:'1335px'}}>93</div>

                    <div className='account-text-read' style={{top:'650px', left:"875px"}}>0Nickname0</div>

                    {/*<div className='rec' style={{left: '805px', top: '706px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>*/}
                    {/*<div className='account-check-mark'/>*/}


                </div>
                <div className='imgfs' style={{left:'710px', top:'1435px'}}></div>
                    {/*<div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>*/}
                <div className='account-text-comment'>Хинаточка, продолжай нас радовать своим твореством!!!!</div>
                <div className='imgfs' style={{left:'710px', top:'1515px'}}></div>

                <input type="text" id="comment" name="comment" placeholder="Оставить комментарий" className='account-text-write'/>


            </div>
        );
    }
}

export default AuthorPage;