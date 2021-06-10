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
