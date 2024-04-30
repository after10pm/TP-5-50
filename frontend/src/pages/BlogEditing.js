import React, {Component} from 'react';
import Post from "../components/Post";
import Statistic from "../components/Statistic";
import {NavLink} from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import NewPost from "../components/NewPost";
import {POSTS} from "../shared/Posts";


class BlogEditing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewPost: false,
            POSTS:POSTS,
            showButton: true
        };
    }
    handleImageUpload = (e) => {
        const file = e.target.files[0];

    };
    handleCreatePost = () => {
        this.setState({ showNewPost: true });
        this.setState({showButton:false})
    };
    deletePost = (postId) => {
        const updatedPosts = this.state.POSTS.filter((post) => post.index !== postId);
        this.setState({ POSTS: updatedPosts });
        console.log(updatedPosts);
    };

    addNewPost = (newPost) => {
        const updatedPosts = [...this.state.POSTS, newPost];
        this.setState({ POSTS: updatedPosts });
        console.log(updatedPosts);
        this.setState({ showNewPost: false});
        this.setState({showButton:true})
    };


    render() {
        const blogPosts = this.state.POSTS.map((item) => {
            return (
                <div key={item.index} className='container' style={{position: 'absolute', top: (-500+item.index * 510) + 'px', left: '0px' }}>
                    <Post onDelete={this.deletePost} index={item.index}
                          title={item.title}
                          description={item.description}
                          author={item.author}
                          date={item.date}
                          POSTS={this.state.POSTS}
                    />
                </div>
            );
        });
        return (
            <div className='header'>


                <NavLink exact to="/" className='brand'>SocialSphere</NavLink>

                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</div>
                <div className='imgfs'></div>

                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1865px', top: '27px', width:'9px', height:'9px'}}/>
                <div className='block-acc' style={{height:'350px'}}></div>
                <div className='imgfs'
                     style={{position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px'}}></div>
                <div className='acc-text-nick'>0Nickname0</div>
                <div className='acc-text-email'>email.email@mail.ru</div>
                <div className='acc-text-2' style={{top:'440px'}}>Изменить данные</div>
                <div className='acc-block-2' style={{height: Math.max(640, this.state.POSTS.length * 580) + 'px'}}></div>

                {this.state.showButton  && (
                    <div className='create-post' onClick={this.handleCreatePost}>Создать пост</div>)
                }
                <div className='acc-text-3' style={{width:'480px', top:'190px'}}>Редактирование блога</div>


                {this.state.showNewPost && (
                    <NewPost addNewPost={this.addNewPost}
                             POSTS={this.state.POSTS}
                    />

                )}
                <div>
                    {blogPosts}
                </div>


                <Statistic/>
            </div>
        );
    }
}

export default BlogEditing;