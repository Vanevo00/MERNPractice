import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

const Dashboard = ({ getCurrentProfile, profileState, auth }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const { user } = auth
  const { profile, loading } = profileState

  let dashboardContent

  if (profile === null || loading) {
    dashboardContent = <Spinner/>
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = <h4>Profile is there</h4>
    } else {
      dashboardContent = (
        <div>
          <p className='lead text-muted'>Welcome {user.name}</p>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-lg btn-info'>Create Profile</Link>
        </div>
      )
    }
  }

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profileState: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
