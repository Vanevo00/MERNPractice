import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addEducation } from '../../actions/profileActions'

const AddExperience = ({ errors, addEducation, history }) => {
  const [inputValues, setInputValues] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })
  const [toFieldDisabled, setToFieldDisabled] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    addEducation(inputValues, history)
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
          <h1 className='display-4 text-center'>Add Education</h1>
          <p className='text-lead text-center'>Add any school, bootcamp etc that you have attended</p>
          <small className='d-block pb-3'>* = required fields</small>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              placeholder='* School'
              name='school'
              value={inputValues.school}
              onChange={onChange}
              error={errors.school}
            />
            <TextFieldGroup
              placeholder='* Degree or Certification'
              name='degree'
              value={inputValues.degree}
              onChange={onChange}
              error={errors.degree}
            />
            <TextFieldGroup
              placeholder='* Field of study'
              name='fieldofstudy'
              value={inputValues.fieldofstudy}
              onChange={onChange}
              error={errors.fieldofstudy}
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
              <label htmlFor='current' className='form-check-label'>Current</label>
            </div>
            <TextAreaFieldGroup
              placeholder='Program Description'
              name='description'
              value={inputValues.description}
              onChange={onChange}
              error={errors.description}
              info='Tell us about the program that you were in'
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

export default connect(mapStateToProps, { addEducation })(withRouter(AddExperience))
