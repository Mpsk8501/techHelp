import is from 'is_js'

const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

const validate = (value, validation = null) => {


  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  if (validation.email) {
    isValid = is.email(value) && isValid
  }
  if (validation.phone) {
    isValid = regex.test(value) && isValid
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid
  }

  return isValid
}

const validateForm = (formControls) => {
  let isFormValid = true

  for (const control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}

export { validate, validateForm }
