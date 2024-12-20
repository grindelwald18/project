import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postId: null,
  isShowPostModal: false
}

export const postPreviewSlice = createSlice({
  name: 'postPreview',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.postId = action.payload
    },
    showPostModal: (state) => {
      state.isShowPostModal = true
    },
    hidePostModal: (state) => {
      state.isShowPostModal = false
    }
  }
})

export const { setPost, showPostModal, hidePostModal } = postPreviewSlice.actions
export const postPreviewReducer = postPreviewSlice.reducer
