import { jwtDecode } from 'jwt-decode'

export function isTokenExpired (token) {
  const decoded = jwtDecode(token)

  return decoded.exp < Date.now() / 1000
}
