import React, {Component} from 'react';
import BlockAcc from "../components/BlockAcc";

class BlogEditing extends Component {
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>
                <div className='block-acc' style={{height:'350px'}}></div>
                <div className='imgfs'
                     style={{position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px'}}></div>
                <div className='acc-text-nick'>0Nickname0</div>
                <div className='acc-text-email'>email.email@mail.ru</div>
                <div className='acc-text-2' style={{top:'440px'}}>Изменить данные</div>



                <div className='acc-block-2'></div>
                <div className='acc-text-3' style={{width:'480px', top:'190px'}}>Редактирование блога</div>

            </div>
        );
    }
}

export default BlogEditing;