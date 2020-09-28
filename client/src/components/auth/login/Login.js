import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'

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
                <TextFieldGroup
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={inputValues.email}
                  onChange={onChange}
                  error={errors.email}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={inputValues.password}
                  onChange={onChange}
                  error={errors.password}
                />
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
