const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  const email = isEmpty(data.email) ? '' : data.email
  const password = isEmpty(data.password) ? '' : data.password

  if (!validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Password must between 6 and 30 characters'
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Invalid email format'
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
