import { client } from '../api/client'
import { signUpEndpoint, activationEndpoint, signInEndpoint, refreshJWTEndpoint, userEndpoint } from '../api/endpoints'

async function requestSignUp (userData) {
  const { data } = await client.post(signUpEndpoint, userData)
  return data
}

async function requestActivation (activationData) {
  const { status } = await client.post(activationEndpoint, activationData)
  return status === 204
}

async function requestSignIn (userData) {
  const { data } = await client.post(signInEndpoint, userData)
  return data
}

async function requestRefreshJWT (refreshToken) {
  const { data } = await client.post(refreshJWTEndpoint, { refresh: refreshToken })
  return data.access
}

async function requestCurrentUser () {
  const { data } = await client.get(userEndpoint)
  return data
}

export { requestSignUp, requestActivation, requestSignIn, requestRefreshJWT, requestCurrentUser }
