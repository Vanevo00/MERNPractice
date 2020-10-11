import React, { useEffect } from 'react'
import { getProfileByHandle } from '../../actions/profileActions'
import { connect } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

const Profile = ({ profile, getProfileByHandle, match }) => {
  const {
    profile: foundProfile,
    loading
  } = profile

  let profileContent

  if (foundProfile === null || loading) {
    profileContent = <Spinner/>
  } else {
    profileContent = (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
              Back To Profiles
            </Link>
          </div>
          <div className='col-md-6'/>
        </div>
        <ProfileHeader profile={foundProfile}/>
        <ProfileAbout profile={foundProfile}/>
        <ProfileCreds education={foundProfile.education} experience={foundProfile.experience}/>
        <ProfileGithub/>
      </div>
    )
  }

  useEffect(() => {
    if (match.params.handle) {
      getProfileByHandle(match.params.handle)
    }
  }, [])

  return (
    <div className='profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            {profileContent}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
