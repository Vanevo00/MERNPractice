const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  const name = isEmpty(data.name) ? '' : data.name
  const email = isEmpty(data.email) ? '' : data.email
  const password = isEmpty(data.password) ? '' : data.password
  const password2 = isEmpty(data.password2) ? '' : data.password2

  if (!validator.isEmail(email)) {
    errors.email = 'Invalid email format'
  }

  if (!validator.isLength(name, {min: 2, max: 30})) {
    errors.name = 'Name must between 2 and 30 characters'
  }

  if (!validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Password must between 6 and 30 characters'
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = 'Password confirmation field is required'
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name field is required'
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
