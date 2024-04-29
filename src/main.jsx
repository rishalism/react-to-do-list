import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(

  <>
    <ToastContainer autoClose={1000} >
    </ToastContainer>
    <App />
  </>
)