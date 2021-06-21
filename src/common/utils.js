export function getStorage (KEY) {
  return window.localStorage.getItem(KEY)
}

export function setStorage (KEY, value) {
  window.localStorage.setItem(KEY, value)
}

export function removeStorage (KEY) {
  window.localStorage.removeItem(KEY)
}
