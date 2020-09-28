import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/authActions'

const Login = ({ loginUser, auth, errors, history }) => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  })

  if (auth.isAuthenticated) history.push('/dashboard')

  const onChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loginUser(inputValues)
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control form-control-lg ${ errors.email && 'is-invalid' }`}
                  placeholder="Email Address" name="email"
                  value={inputValues.email}
                  onChange={onChange}
                />
                { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
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

export default connect(mapStateToProps, { loginUser })(Login)
