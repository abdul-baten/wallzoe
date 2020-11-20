import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.scss'
import { AdminLayout } from './containers/'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <AdminLayout />
      </BrowserRouter>
    )
  }
}
export default App
