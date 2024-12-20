import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestSignUp, requestActivation, requestSignIn, requestRefreshJWT, requestCurrentUser } from '../services/auth'
import { setAccessTokenClient } from '../api/client'
import { getJWTFromLocalStorage } from '../utils/getJWTFromLocalStorage'
import { setJWTToLocalStorage } from '../utils/setJWTToLocalStorage'
import { isTokenExpired } from '../utils/isTokenExpired'
import { removeJWTFromLocalStorage } from '../utils/removeJWTFromLocalStorage'
// Thunks
export const fetchSignUp = createAsyncThunk('auth/fetchSignUp', async (data, { rejectWithValue }) => {
  try {
    return await requestSignUp(data)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchActivation = createAsyncThunk('auth/fetchActivation', async (data, { rejectWithValue }) => {
  try {
    return await requestActivation(data)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})
export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', async (data, { rejectWithValue }) => {
  try {
    const jwtToken = await requestSignIn(data)
    setJWTToLocalStorage(jwtToken)
    setAccessTokenClient(jwtToken.access)
    return jwtToken
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await requestCurrentUser()
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchRefreshJWT = createAsyncThunk('auth/fetchRefreshJWT', async (_, { rejectWithValue, getState }) => {
  try {
    const refreshToken = getState().auth.jwt?.refresh

    if (!refreshToken) {
      throw new Error('No refresh token')
    }

    const accessToken = await requestRefreshJWT(refreshToken)
    const newJWT = {
      refresh: refreshToken,
      access: accessToken
    }
    setJWTToLocalStorage(newJWT)
    setAccessTokenClient(accessToken)

    return newJWT
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const initialState = {
  error: null,
  isLoading: false,
  activationStatus: false,
  isAuth: false,
  jwt: getJWTFromLocalStorage(),
  currentUser: null
}

setAccessTokenClient(initialState.jwt?.access)

if (initialState.jwt && !isTokenExpired(initialState.jwt?.access)) {
  initialState.isAuth = true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
      state.jwt = null
      state.currentUser = null
      state.error = null
      removeJWTFromLocalStorage()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.isAuth = true
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Error during sign up'
      })
      .addCase(fetchActivation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchActivation.fulfilled, (state, action) => {
        state.activationStatus = true
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(fetchActivation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.jwt = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchRefreshJWT.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchRefreshJWT.fulfilled, (state, action) => {
        state.jwt = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(fetchRefreshJWT.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.isLoading = false
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer
