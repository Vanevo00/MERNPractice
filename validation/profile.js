const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  const handle = isEmpty(data.handle) ? '' : data.handle
  const status = isEmpty(data.status) ? '' : data.status
  const skills = isEmpty(data.skills) ? '' : data.skills
  const website = isEmpty(data.website) ? '' : data.website
  const youtube = isEmpty(data.youtube) ? '' : data.youtube
  const twitter = isEmpty(data.twitter) ? '' : data.twitter
  const facebook = isEmpty(data.facebook) ? '' : data.facebook
  const linkedin = isEmpty(data.linkedin) ? '' : data.linkedin
  const instagram = isEmpty(data.instagram) ? '' : data.instagram

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

  if(!validator.isEmpty(website) && !validator.isURL(website)) {
    errors.website = 'Not a valid URL'
  }

  if(!validator.isEmpty(youtube) && !validator.isURL(youtube)) {
    errors.youtube = 'Not a valid URL'
  }

  if(!validator.isEmpty(twitter) && !validator.isURL(twitter)) {
    errors.twitter = 'Not a valid URL'
  }

  if(!validator.isEmpty(facebook) && !validator.isURL(facebook)) {
    errors.facebook = 'Not a valid URL'
  }

  if(!validator.isEmpty(linkedin) && !validator.isURL(linkedin)) {
    errors.linkedin = 'Not a valid URL'
  }

  if(!validator.isEmpty(instagram) && !validator.isURL(instagram)) {
    errors.instagram = 'Not a valid URL'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

