import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'

const Dashboard = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return (
    <h1>pes</h1>
  )
}

export default connect(null, { getCurrentProfile })(Dashboard)
