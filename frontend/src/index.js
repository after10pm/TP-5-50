import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './Test/reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import MainMenuPage from "./pages/MainMenuPage";
import Register from "./pages/Register";
import Rules from "./pages/Rules";
import Authorization from "./pages/Authorization";
import PersonalAccount from "./pages/PersonalAccount";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PersonalAccount/>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
