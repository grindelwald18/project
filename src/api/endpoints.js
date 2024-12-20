const baseEndpoint = 'https://studapi.teachmeskills.by'

// Auth
const signUpEndpoint = '/auth/users/'
const activationEndpoint = '/auth/users/activation/'
const signInEndpoint = '/auth/jwt/create/'
const refreshJWTEndpoint = '/auth/jwt/refresh/'
const userEndpoint = '/auth/users/me/'

// Posts
const postsEndpoint = '/blog/posts/'
const myPostsEndpoint = '/blog/posts/my_posts/'

export {
  baseEndpoint,
  signUpEndpoint,
  activationEndpoint,
  signInEndpoint,
  refreshJWTEndpoint,
  userEndpoint,
  myPostsEndpoint,
  postsEndpoint
}
