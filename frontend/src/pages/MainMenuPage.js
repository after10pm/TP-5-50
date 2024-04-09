import React, {Component} from 'react';
import MainPage from "../components/MainPage";
import MainMenu from "../components/MainMenu";
import Fotter from "../components/Fotter";
import {BrowserRouter} from "react-router-dom";

function MainMenuPage() {
    {
        return (

                <div>
                <MainPage/>
                <MainMenu/>
                <Fotter/>
            </div>



        );
    }
}

export default MainMenuPage;