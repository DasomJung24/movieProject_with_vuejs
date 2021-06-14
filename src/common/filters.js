import moment from 'moment'
import format from 'string-format'

format.extend(String.prototype, {})

export function toKstDate (value) {
  if (value) {
    return moment(value).format('YYYY.MM.DD')
  } else {
    return null
  }
}

export function titleLength (value) {
  if (value.length > 12) {
    value = value.slice(0, 12)
    return value + '...'
  }
  return value
}

export function contentLength (value) {
  if (value.length > 70) {
    value = value.slice(0, 70)
    return value
  }
  return value
}
