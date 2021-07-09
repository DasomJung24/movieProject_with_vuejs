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

export function movieTitleLength (value) {
  if (value.length > 15) {
    value = value.slice(0, 15)
    return value + '...'
  }
  return value
}

export function translateDay (value) {
  if (value === 'Sunday') {
    return '일'
  } else if (value === 'Monday') {
    return '월'
  } else if (value === 'Tuesday') {
    return '화'
  } else if (value === 'Wednesday') {
    return '수'
  } else if (value === 'Thursday') {
    return '목'
  } else if (value === 'Friday') {
    return '금'
  } else {
    return '토'
  }
}
