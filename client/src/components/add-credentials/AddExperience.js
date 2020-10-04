import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

const AddExperience = ({ profile, errors }) => {
  const [inputValues, setInputValues] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {}
  })
  const [toFieldDisabled, setToFieldDisabled] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  const onChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onCheckCurrent = () => {
    setToFieldDisabled(!toFieldDisabled)
    setInputValues({
      ...inputValues,
      current: !inputValues.current
    })
  }

  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='col-md-8 m-auto'>
          <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
          <h1 className='display-4 text-center'>Add Experience</h1>
          <p className='text-lead text-center'>Add any job or position that you have had in the past or current</p>
          <small className='d-block pb-3'>* = required fields</small>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              placeholder='* Company'
              name='company'
              value={inputValues.company}
              onChange={onChange}
              error={errors.company}
            />
            <TextFieldGroup
              placeholder='* Job Title'
              name='title'
              value={inputValues.title}
              onChange={onChange}
              error={errors.title}
            />
            <TextFieldGroup
              placeholder='Location'
              name='location'
              value={inputValues.location}
              onChange={onChange}
              error={errors.location}
            />
            <h6>From Date</h6>
            <TextFieldGroup
              name='from'
              type='date'
              value={inputValues.from}
              onChange={onChange}
              error={errors.from}
            />
            <h6>To Date</h6>
            <TextFieldGroup
              name='to'
              type='date'
              value={inputValues.to}
              onChange={onChange}
              error={errors.to}
              disabled={toFieldDisabled ? 'disabled' : ''}
            />
            <div className='form-check mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                name='current'
                value={inputValues.current}
                checked={inputValues.current}
                onChange={onCheckCurrent}
                id='current'
              />
              <label htmlFor='current' className='form-check-label'>Current Job</label>
            </div>
            <TextAreaFieldGroup
              placeholder='Job Description'
              name='description'
              value={inputValues.description}
              onChange={onChange}
              error={errors.description}
              info='Tell us about the position'
            />
            <input type='submit' value='Submit' className='btn btn-info btn-block mt-4'/>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {})(withRouter(AddExperience))
