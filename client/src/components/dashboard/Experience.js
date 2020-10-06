import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

const Experience = ({ experience, deleteExperience }) => {
  const onDeleteClick = (id) => {
    deleteExperience(id)
  }

  const experienceRows = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td><Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}</td>
      <td><button className='btn btn-danger' onClick={() => onDeleteClick(exp._id)}>Delete</button></td>
    </tr>
  ))

  return (
    <div>
      <h4 className='mb-4'>Experience Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {experienceRows}
        </tbody>
      </table>
    </div>
  )
}

export default connect(null, { deleteExperience })(Experience)
