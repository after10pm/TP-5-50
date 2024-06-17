import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './Test/reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainMenuPage from "./pages/MainMenuPage";
import Register from "./pages/Register";
import Rules from "./pages/RulesPage";
import Authorization from "./pages/Authorization";
import PersonalAccount from "./pages/PersonalAccount";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
reportWebVitals();
