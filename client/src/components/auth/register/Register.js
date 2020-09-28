import React, { useState } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/authActions'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../../common/TextFieldGroup'

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
                <TextFieldGroup
                  placeholder='Name'
                  name='name'
                  value={inputValues.name}
                  onChange={onChange}
                  error={errors.name}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={inputValues.email}
                  onChange={onChange}
                  error={errors.email}
                  info='This site uses Gravatar so if you want a profile image, use a
                  Gravatar email'
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
              <div className="form-group">
                <TextFieldGroup
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={inputValues.password2}
                  onChange={onChange}
                  error={errors.password2}
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
