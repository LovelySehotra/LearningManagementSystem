//Component import
import App from './App.jsx';
//CSS import
import './index.css';
// Library import
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    // this provider comp.come from react-redux
    <Provider store={store}> 
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </Provider>


)
