import React, {Component} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
class Post extends Component {
    state = {
        isPostDeleted: false,
        isEditing: false,
        editedText: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. Дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы."
    };
    handleDeletePost = () => {

        const confirmDelete = window.confirm("Вы действительно хотите удалить пост?");
        if (confirmDelete) {
            this.setState({ isPostDeleted: true });
        }
    };
    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    };

    handleChange = (event) => {
        this.setState({ editedText: event.target.value });
    };
    render() {
        if (this.state.isPostDeleted) {
            return(
                <div>Ваш пост удалён</div>
            );

        }else{
            return (
                <div>

                    <div className='change-block-acc'></div>
                    <div className='button-change-post' onClick={this.toggleEdit}>Редактировать пост</div>
                    <div className='button-delete-post' onClick={this.handleDeletePost}>Удалить пост</div>
                    <div className='imgfs' style={{ left: '800px', top: '280px' }}></div>
                    <div className='acc-text-4'>0Nickname0</div>
                    <div className='imgfs-3'></div>
                    <div className='acc-text-5'>Название поста 1</div>
                    {this.state.isEditing ? (
                        <textarea className='text-under-post' style={{left: '861px', top: '510px'}} value={this.state.editedText} onChange={this.handleChange} />
                    ) : (
                        <div className='text-under-post'>{this.state.editedText}</div>
                    )}
                    <div className='date-post'>18:01 21.08.2024</div>
                    <div className='heart'></div>
                    <div className='number-likes'>1000</div>
                    <i className="bi bi-chat-right-text comments-mark"></i>
                    <div className='comments'>30</div>
                </div>
            );
        }

    }
}

export default Post;