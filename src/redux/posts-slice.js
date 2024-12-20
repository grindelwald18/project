import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestPosts, requestMyPosts } from '../services/post'

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  limit: 10,
  pagesCount: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params = {}, { rejectWithValue }) => {
  try {
    const offset = (params.page - 1) * initialState.limit
    return await requestPosts({ limit: initialState.limit, offset, ...params })
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchMyPosts = createAsyncThunk('posts/fetchMyPosts', async (_, { rejectWithValue }) => {
  try {
    return requestMyPosts({ limit: initialState.limit })
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action) => {
      console.log(action.payload)
      if (state.list[action.payload].status === 'liked') {
        state.list[action.payload].status = 'neutral'
      } else {
        state.list[action.payload].status = 'liked'
      }
    },
    dislikePost: (state, action) => {
      if (state.list[action.payload].status === 'disliked') {
        state.list[action.payload].status = 'neutral'
      } else {
        state.list[action.payload].status = 'disliked'
      }
    },
    makeFavorite: (state, action) => {
      if (state.list[action.payload].isFavorite) {
        state.list[action.payload].isFavorite = false
      } else {
        state.list[action.payload].isFavorite = true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log('state.list ', state.list)
        console.log('action.payload.count ', action.payload.count)
        state.list = action.payload.results?.map((post) => ({ ...post, status: 'neutral', isFavorite: false }))
        state.pagesCount = Math.ceil(action.payload.count / state.limit)
        state.error = null
        state.isLoading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
      .addCase(fetchMyPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.list = action.payload
        state.error = null
        state.isLoading = false
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.error = action.error.message
        state.list = []
        state.isLoading = false
      })
  }
})

export const { likePost, dislikePost, makeFavorite } = postsSlice.actions
export const postsReducer = postsSlice.reducer
