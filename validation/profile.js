const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  const handle = isEmpty(data.handle) ? '' : data.handle
  const status = isEmpty(data.status) ? '' : data.status
  const skills = isEmpty(data.skills) ? '' : data.skills

  if (!validator.isLength(handle, {min: 2, max: 40})) {
    errors.handle = 'Password must be between 2 and 40 characters'
  }

  if (validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required'
  }

  if (validator.isEmpty(status)) {
    errors.status = 'Status field is required'
  }

  if (validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required'
  }

  if(!isEmpty(data.website) && !validator.isURL(data.website)) {
    errors.website = 'Not a valid URL'
  }

  if(!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
    errors.youtube = 'Not a valid URL'
  }

  if(!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
    errors.twitter = 'Not a valid URL'
  }

  if(!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
    errors.facebook = 'Not a valid URL'
  }

  if(!isEmpty(data.linkedin) && !validator.isURL(data.linkedin)) {
    errors.linkedin = 'Not a valid URL'
  }

  if(!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
    errors.instagram = 'Not a valid URL'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

