import '../components/App.css';
import 'bootstrap/dist/js/bootstrap.min'
import {BrowserRouter, Link, NavLink, Route, Routes, useRoutes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MainMenuPage from "./MainMenuPage";
import MainPage from "../components/MainPage";
import Authorization from "./Authorization";
import Register from "./Register";
import Rules from "./Rules";
import PersonalAccount from "./PersonalAccount";
import PersonalAccountAuthor from "./PersonalAccountAuthor";
import BlogEditing from "./BlogEditing";
import AuthorPage from "./AuthorPage";
import Category from "./Category";
import AdminAccounts from "./AdminAccounts";
import BlockCategory from "../components/blockCategory";
import CategoryAdmins from "./categoryAdmins";
import ServicePanel from "./ServicePanel";
import axios from "axios";

function App() {
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [userIdAcc, setUserId] = useState('');
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
                setUser(content);
                setUserId(content.id);
            }
        )();
    });
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<MainMenuPage/>} />
                <Route path="/authorization" element={<Authorization/>}  />
                <Route path="/register" element={<Register/>} />
                <Route path="/rules" element={<Rules/>} />
                <Route path="/my_profile" element={<PersonalAccount user={user} />} />
                <Route path="/profileAuthor" element={<PersonalAccountAuthor/>} />
                <Route path="/blogEditing" element={<BlogEditing/>} />
                <Route path="/profile/:userId" element={<AuthorPage/>} />
                <Route path="/category" element={<Category/>} />
                <Route path="/adminAccounts" element={<AdminAccounts/>} />
                <Route path="/categoryAdmins" element={<CategoryAdmins/>} />
                <Route path="/ServicePanel" element={<ServicePanel/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;