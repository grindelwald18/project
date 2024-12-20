import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  isShowModal: false
}

const postImagePreview = createSlice({
  name: 'postImage',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    },
    showModal: (state) => {
      state.isShowModal = true
    },
    hideModal: (state) => {
      state.isShowModal = false
    }
  }
})

export const { setId, showModal, hideModal } = postImagePreview.actions
export const postImagePreviewReducer = postImagePreview.reducer
