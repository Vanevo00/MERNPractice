import React, { useState } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/authActions'
import { withRouter } from 'react-router-dom'

const Register = ({ registerUser, auth, errors, history }) => {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  if (auth.isAuthenticated) history.push('/dashboard')

  const onChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    registerUser(inputValues, history)
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${ errors.name && 'is-invalid' }`}
                  placeholder="Name"
                  name="name"
                  value={inputValues.name}
                  onChange={onChange}
                />
                { errors.name && <div className='invalid-feedback'>{errors.name}</div>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control form-control-lg ${ errors.email && 'is-invalid' }`}
                  placeholder="Email Address"
                  name="email"
                  value={inputValues.email}
                  onChange={onChange}
                />
                { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a
                  Gravatar email</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${ errors.password && 'is-invalid' }`}
                  placeholder="Password"
                  name="password"
                  value={inputValues.password}
                  onChange={onChange}
                />
                { errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${ errors.password2 && 'is-invalid' }`}
                  placeholder="Confirm Password"
                  name="password2"
                  value={inputValues.password2}
                  onChange={onChange}
                />
                { errors.password2 && <div className='invalid-feedback'>{errors.password2}</div>}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
