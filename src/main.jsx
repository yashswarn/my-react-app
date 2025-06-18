import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './store.js'
import { Toaster } from 'react-hot-toast'


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>
  </StrictMode>,
)


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Provider store={store}>
//     <App />
//     <Toaster/>
//   </Provider>
//       {/* <App /> */}
//     </BrowserRouter>
//   </React.StrictMode>
// );




