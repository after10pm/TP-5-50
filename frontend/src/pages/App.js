import '../components/App.css';
import 'bootstrap/dist/js/bootstrap.min'
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
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
import Testusers from "./testusers";
import axios from "axios";

class App extends React.Component{
    state = {details:[], }
    componentDidMount() {
        let data;
        axios.get("http://localhost:8000")
            .then(res =>{
            data = res.data;
            this.setState({
                details: data
            });

        })
            .catch(err =>{
                console.log(err);
            })

    }

    render() {

        return(
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<MainMenuPage/>} />
                    <Route path="/authorization" element={<Authorization/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/rules" element={<Rules/>} />
                    <Route path="/profile" element={<PersonalAccount/>} />
                    <Route path="/profileAuthor" element={<PersonalAccountAuthor/>} />
                    <Route path="/blogEditing" element={<BlogEditing/>} />
                    <Route path="/authorPage" element={<AuthorPage/>} />
                    <Route path="/category" element={<Category/>} />
                    <Route path="/adminAccounts" element={<AdminAccounts/>} />
                    <Route path="/categoryAdmins" element={<CategoryAdmins/>} />
                    <Route path="/ServicePanel" element={<ServicePanel/>} />
                    
                </Routes>
            </BrowserRouter>

            )


    }
}

export default App;
