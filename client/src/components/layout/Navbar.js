import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearProfile } from '../../actions/profileActions'


const Navbar = ({ auth, logoutUser, clearProfile }) => {
  const {
    isAuthenticated,
    user
  } = auth

  const onLogoutClick = (e) => {
    e.preventDefault()
    clearProfile()
    logoutUser()
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a
          href='#'
          onClick={onLogoutClick}
          className='nav-link'
        >
          <img src={user.avatar} alt={user.name} className='rounded-circle' title='you must have a gravatar connected to your email to display an image' style={{ width: '25px', marginRight: '5px'}} />Logout
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="login">Login</Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="/">DevConnector</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles"> Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar)
