import { extend } from 'vee-validate'
import { required, email, min, max, numeric, alpha, integer } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '필수 입력항목입니다.'
})

extend('password', {
  params: ['target'],
  validate (value, { target }) {
    console.log(target)
    return value === target
  },
  message: '패스워드가 일치하지 않습니다.'
})

extend('password_pattern', {
  validate (value) {
    const strongRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')
    return strongRegex.test(value)
  },
  message: '영문/숫자가 포함되어야 합니다.'
})

extend('email', email)

extend('min', {
  ...min,
  validate (value, min) {
    if (value.length >= min.length) {
      return true
    }
    return min.length + '글자 이상 입력해주세요.'
  }
})

extend('max', {
  ...max,
  validate (value, max) {
    if (value.length <= max.length) {
      return true
    }
    return max.length + '글자 이하 입력해주세요.'
  }
})

extend('integer', {
  ...integer,
  validate (value) {
    const regex = new RegExp('^[0-9]')
    return regex.test(value)
  },
  message: '숫자만 입력해주세요.'
})

extend('numeric', numeric)

extend('alpha', alpha)
