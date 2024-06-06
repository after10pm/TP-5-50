import '../components/App.css';
import 'bootstrap/dist/js/bootstrap.min'
import {BrowserRouter, Link, Navigate, NavLink, Outlet, Route, Routes, useRoutes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MainMenuPage from "./MainMenuPage";
import MainPage from "../components/MainPage";
import Authorization from "./Authorization";
import Register from "./Register";
import Rules from "./Rules";
import PersonalAccount from "./PersonalAccount";

import BlogEditing from "./BlogEditing";
import AuthorPage from "./AuthorPage";
import Category from "./Category";
import AdminAccounts from "./AdminAccounts";
import BlockCategory from "../components/blockCategory";
import CategoryAdmins from "./categoryAdmins";
import ServicePanel from "./ServicePanel";
import {withRedirectIfBlank} from '../components/withRedirectIfBlank'

import axios from "axios";
import ProtectedRoutes from "../components/ProtectedRoutes";

function App() {
    const [user, setUser] = useState('');
    const [userIdAcc, setUserId] = useState('');
    const [redirectTo, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                if (response.ok) {
                    setUser(content);
                    setRedirect(true);

                } else {
                    setRedirect(false);
                }

            }
        )();
    });


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<MainMenuPage user={user}/>}/>
                <Route path="/authorization" element={<Authorization/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/rules" element={<Rules/>}/>

                <Route path="/my_profile" element={<PersonalAccount user={user}/>}/>


                <Route path="/blogEditing" element={<BlogEditing user={user}/>}/>
                <Route path="/profile/:userId" element={<AuthorPage user={user}/>}/>
                <Route path="/category" element={<Category user={user}/>}/>
                <Route path="/adminAccounts" element={<AdminAccounts user={user}/>}/>
                <Route path="/categoryAdmins" element={<CategoryAdmins user={user}/>}/>
                <Route path="/servicePanel" element={<ServicePanel user={user}/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;