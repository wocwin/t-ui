import Cookies from 'js-cookie'

const TokenKey = 'authorization'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  let to = ''
  if (!Cookies.get(TokenKey)) {
    to = Cookies.set(TokenKey, token)
  }
  return to
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
