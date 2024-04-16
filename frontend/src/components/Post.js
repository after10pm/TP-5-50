import React, {Component} from 'react';

class Post extends Component {
    render() {
        return (
            <div>

                <div className='change-block-acc'></div>
                <div className='button-change-post'>Редактировать пост</div>
                <div className='button-delete-post'>Удалить пост</div>
                <div className='imgfs' style={{left: '800px', top:'280px'}}></div>
                <div className='acc-text-4'>0Nickname0</div>
                <div className='imgfs-3'></div>
                <div className='acc-text-5'>Название поста 1</div>
                <div className='text-under-post'>
                    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.
                    Дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы.
                </div>
                <div className='date-post'>18:01 21.08.2024</div>
                <div className='heart'></div>
                <div className='number-likes'>1000</div>
                <div className='comments'>30</div>
            </div>
        );
    }
}

export default Post;