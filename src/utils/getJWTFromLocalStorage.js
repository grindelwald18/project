export function getJWTFromLocalStorage () {
  const jwtJSON = localStorage.getItem('jwt')

  if (!jwtJSON) return null

  return JSON.parse(jwtJSON)
}
