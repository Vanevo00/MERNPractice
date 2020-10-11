import React from 'react'
import isEmpty from '../../validation/isEmpty'

const ProfileHeader = ({ profile }) => {
  const {
    user: {
      avatar,
      name
    },
    status,
    company,
    location,
    website,
    social: {
      twitter,
      facebook,
      instagram,
      linkedin,
      youtube
    } = {}
  } = profile

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={avatar} alt={name}/>
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{name}</h1>
            <p className="lead text-center">{status} {isEmpty(company) ? null : (<span>at {company}</span>)}</p>
            {isEmpty(location) ? null : (<p>{location}</p>)}
            <p>
              {isEmpty(website) ? null : (
                <a className="text-white p-2" href={website} target='_blank'>
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}
              {isEmpty(twitter) ? null : (
                <a className="text-white p-2" href={twitter} target='_blank'>
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {isEmpty(facebook) ? null : (
                <a className="text-white p-2" href={facebook} target='_blank'>
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}
              {isEmpty(linkedin) ? null : (
                <a className="text-white p-2" href={linkedin} target='_blank'>
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {isEmpty(youtube) ? null : (
                <a className="text-white p-2" href={youtube} target='_blank'>
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
