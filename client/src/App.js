import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { logoutUser, setCurrentUser } from './actions/authActions'
import { clearProfile } from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'

const App = () => {
  const checkForExpiredToken = (decoded) => {
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser())
      window.location.href('/login')
      store.dispatch(clearProfile())
    }
  }

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))
    checkForExpiredToken(decoded)
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path='/' component={ Landing }/>
          <div className='container'>
            <Route exact path='/register' component={ Register }/>
            <Route exact path='/login' component={ Login }/>
            <Switch>
              <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
