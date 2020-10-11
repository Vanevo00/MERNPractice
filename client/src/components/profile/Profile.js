import React, { useEffect } from 'react'
import { getProfileByHandle } from '../../actions/profileActions'
import { connect } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'

const Profile = ({ profile, getProfileByHandle, match }) => {
  useEffect(() => {
    if (match.params.handle) {
      getProfileByHandle(match.params.handle)
    }
  }, [])

  return (
    <div>
      <ProfileHeader/>
      <ProfileAbout/>
      <ProfileCreds/>
      <ProfileGithub/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
