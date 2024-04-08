import '../components/App.css';
import 'bootstrap/dist/js/bootstrap.min'
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import MainMenuPage from "./MainMenuPage";
import MainPage from "../components/MainPage";

function App() {
    return (
        <BrowserRouter>

            <NavLink exact to="/dsa" className='button-reg'>Регистрация</NavLink>

            <Routes>
                <Route path="/dsa" element={<MainMenuPage/>}/>

            </Routes>

        </BrowserRouter>

    );
}

export default App;
