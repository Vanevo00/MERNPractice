import React, { useState } from 'react'

const Register = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(inputValues)
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
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={inputValues.name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={inputValues.email}
                  onChange={onChange}
                />
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a
                  Gravatar email</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={inputValues.password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  value={inputValues.password2}
                  onChange={onChange}
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

export default Register
