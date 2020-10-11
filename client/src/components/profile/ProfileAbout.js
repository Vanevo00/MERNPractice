import React from 'react'
import isEmpty from '../../validation/isEmpty'

const ProfileAbout = ({ profile }) => {
  const {
    user: {
      name
    },
    bio,
    skills
  } = profile

  const firstName = name.trim().split(' ')[0]

  const profileSkills = skills.map((skill, index) => (
    <div key={index} className='p-3'>
      <i className='fa fa-check'/> {skill}
    </div>
  ))

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">{isEmpty(bio) ? `${firstName} does not have a bio` : bio}</p>
          <hr/>
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {profileSkills}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileAbout
