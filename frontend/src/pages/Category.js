import React, {Component, useEffect, useState} from 'react';
import "../components/Category.css";
import BlockCategory from "../components/blockCategory";
import {Navigate, NavLink} from "react-router-dom";
import LoadingAnimation from "../animaiton/LoadingAnimation";

function Category(props) {
    const user = props.user;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Set loading to false after 2 seconds

        return () => clearTimeout(timer);
    }, []);




    if (user === '') {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )
        } else {
            return (
                <div>
                    <Navigate to={"/authorization"}/>
                </div>
            )

        }

    } else {
        if (isLoading) {
            return (
                <div className='center-anim'>
                    <LoadingAnimation/>
                </div>
            )

        } else {
            return (
                <div>
                    <div className='header'>
                        <NavLink exact to="/" className="brand">SocialSphere</NavLink>
                    </div>

                    <NavLink exact to="/profile" className='button'
                             style={{position: 'absolute', left: '1660px', width: '215px'}}>0Nickname0</NavLink>
                    <div className='imgfs'></div>
                    <div className='rec' style={{
                        left: '1860px',
                        top: '25px',
                        backgroundColor: '#DFDEFF',
                        width: '21px',
                        height: '21px'
                    }}></div>
                    <div className='account-check-mark' style={{left: '1865px', top: '27px', width: '9px', height: '9px'}}/>


                    <BlockCategory/>
                    <div className='category-main-text'>Категории</div>
                </div>
            );
        }

    }
}

export default Category;