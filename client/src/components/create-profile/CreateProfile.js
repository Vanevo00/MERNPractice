import React, { useState } from 'react'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import { createProfile } from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'

const statusOptions = [
  {label: '* Select Professional Status', value: 0},
  {label: 'developer', value: 'developer'},
  {label: 'student', value: 'student'},
  {label: 'manager', value: 'manager'},
  {label: 'intern', value: 'intern'},
  {label: 'other', value: 'other'},
  {label: 'teacher', value: 'teacher'},
]

const CreateProfile = ({ profile, errors, history, createProfile }) => {
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false)
  const [inputValues, setInputValues] = useState({
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(inputValues, history)
  }

  const onChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const socialInputs = (
    <>
      <InputGroup
        placeholder='Twitter Profile URL'
        name='twitter'
        icon='fab fa-twitter'
        value={inputValues.twitter}
        onChange={onChange}
        error={errors.twitter}
      />
      <InputGroup
        placeholder='Facebook Profile URL'
        name='facebook'
        icon='fab fa-facebook'
        value={inputValues.facebook}
        onChange={onChange}
        error={errors.facebook}
      />
      <InputGroup
        placeholder='LinkedIn Profile URL'
        name='linkedin'
        icon='fab fa-linkedin'
        value={inputValues.linkedin}
        onChange={onChange}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder='Youtube Profile URL'
        name='youtube'
        icon='fab fa-youtube'
        value={inputValues.youtube}
        onChange={onChange}
        error={errors.youtube}
      />
      <InputGroup
        placeholder='Instagram Profile URL'
        name='instagram'
        icon='fab fa-instagram'
        value={inputValues.instagram}
        onChange={onChange}
        error={errors.instagram}
      />
    </>
  )

  return (
    <div className='create-profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Create Your Profile</h1>
            <p className='lead text-center'>Let's get some information to make your profile stand out</p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* Profile Handle'
                name='handle'
                value={inputValues.handle}
                onChange={onChange}
                error={errors.handle}
                info='A unique handle for your profile URL.'
              />
              <SelectListGroup
                name='status'
                value={inputValues.status}
                onChange={onChange}
                error={errors.status}
                options={statusOptions}
                info='Give us an idea where you are in your career.'
              />
              <TextFieldGroup
                placeholder='Company'
                name='company'
                value={inputValues.company}
                onChange={onChange}
                error={errors.company}
                info='Could be your own company or one you work for.'
              />
              <TextFieldGroup
                placeholder='Website'
                name='website'
                value={inputValues.website}
                onChange={onChange}
                error={errors.website}
                info='Could be your own website or a company one.'
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={inputValues.location}
                onChange={onChange}
                error={errors.location}
                info='City or city & state suggested.'
              />
              <TextFieldGroup
                placeholder='* Skills'
                name='skills'
                value={inputValues.skills}
                onChange={onChange}
                error={errors.skills}
                info='Please use comma separated values (eg. HTML,CSS,JavaScript,Node,React)'
              />
              <TextFieldGroup
                placeholder='Github Username'
                name='githubusername'
                value={inputValues.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info='If you want your lates repos and a Github link, include your username'
              />
              <TextAreaFieldGroup
                placeholder='Short Bio'
                name='bio'
                value={inputValues.bio}
                onChange={onChange}
                error={errors.bio}
                info='Tell us a little bit about yourself '
              />
              <div className='mb-3'>
                <button type='button' onClick={(e) => {setDisplaySocialInputs(!displaySocialInputs)}} className='btn btn-light mr-3'>Add Social Network Links</button>
                <span className='text-muted'>Optional</span>
              </div>
                {displaySocialInputs && socialInputs}
                <button type='submit' className='btn btn-info btn-block mt-4'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
