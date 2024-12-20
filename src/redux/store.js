import { configureStore } from '@reduxjs/toolkit'
import { langReducer } from './lang-slice'
import { authReducer, fetchRefreshJWT } from './auth-slice'
import { postImagePreviewReducer } from './post-image-slice'
import { postPreviewReducer } from './post-preview-slice'
import { postsReducer } from './posts-slice'
import { isTokenExpired } from '../utils/isTokenExpired'

let isRefreshing = false
const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState()
  const currentToken = state.auth.jwt?.access

  if (currentToken && !isRefreshing && isTokenExpired(currentToken)) {
    isRefreshing = true
    store.dispatch(fetchRefreshJWT())
      .finally(() => { isRefreshing = false })
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postImagePreview: postImagePreviewReducer,
    postPreview: postPreviewReducer,
    lang: langReducer,
    posts: postsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenExpirationMiddleware)
})
