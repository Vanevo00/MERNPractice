import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

const Education = ({ education, deleteEducation }) => {
  const onDeleteClick = (id) => {
    deleteEducation(id)
  }

  const educationRows = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td><Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}</td>
      <td><button className='btn btn-danger' onClick={() => onDeleteClick(edu._id)}>Delete</button></td>
    </tr>
  ))

  return (
    <div>
      <h4 className='mb-4'>Education Information</h4>
      <table className='table'>
        <thead>
        <tr>
          <th>School</th>
          <th>Degree</th>
          <th>Years</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {educationRows}
        </tbody>
      </table>
    </div>
  )
}

export default connect(null, { deleteEducation })(Education)
