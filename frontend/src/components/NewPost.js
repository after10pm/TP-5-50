import React, {Component} from 'react';

class NewPost extends Component {

    state = {
        postTitle: '',
        postText: ''
    };

    handleTitleChange = (event) => {
        this.setState({ postTitle: event.target.value });
    };

    handleTextChange = (event) => {
        this.setState({ postText: event.target.value });
    };
    handleAddFromHide = () =>{
        this.setState({
            postTitle: '',
            postText: ''
        })
    }
    createPost = () =>{
        const post ={
            title:this.state.postTitle,
            description:this.state.postText
        }
        console.log(post)

        this.handleAddFromHide()
    }
    render() {
        return (
            <div>
                <div className='block-create-post'></div>

                <input
                    type="text"
                    id="post_text"
                    name="post_text"
                    placeholder="Введите заголовок"
                    className='block-create-text'
                    value={this.state.postTitle}
                    onChange={this.handleTitleChange}
                />

                <textarea
                    placeholder='Введите текст поста'
                    className='block-create-text-2'
                    value={this.state.postText}
                    onChange={this.handleTextChange}
                />


                <input type="file" id="fileInput" style={{display: 'none'}} onChange={this.handleImageUpload} accept=".jpg, .png" />
                <i className="bi bi-paperclip block-create-img-2" onClick={() => document.getElementById('fileInput').click()}></i>
                <div className='block-create-img' onClick={() => document.getElementById('fileInput').click()} >Прикрепить картинку</div>


                <button className='create-post' style={{top:'1180px'}} onClick={this.createPost}>Опубликовать пост</button>



            </div>
        );
    }
}

export default NewPost;