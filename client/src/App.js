import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import Dashboard from './components/layout/Dashboard'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'

const App = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path='/' component={ Landing }/>
          <Route exact path='/dashboard' component={ Dashboard }/>
          <div className='container'>
            <Route exact path='/register' component={ Register }/>
            <Route exact path='/login' component={ Login }/>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
