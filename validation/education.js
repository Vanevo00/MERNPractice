const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  const school = isEmpty(data.school) ? '' : data.school
  const degree = isEmpty(data.degree) ? '' : data.degree
  const fieldofstudy = isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy
  const from = isEmpty(data.from) ? '' : data.from

  if (validator.isEmpty(school)) {
    errors.school = 'School is required'
  }

  if (validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required'
  }

  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required'
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From date field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
