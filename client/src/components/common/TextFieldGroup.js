import React from 'react'

const TextFieldGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled }) => {
  return (
    <>
    <input
      type={type}
      className={`form-control form-control-lg ${ error && 'is-invalid' }`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    { info && <small className='form-text text-muted'>{info}</small>}
    { error && <div className='invalid-feedback'>{error}</div>}
  </>
  )
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
