export function setJWTToLocalStorage (jwt) {
  localStorage.setItem('jwt', JSON.stringify(jwt))
}
