const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const errors = {}

  if (!validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must between 2 and 30 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
