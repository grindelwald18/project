import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hidePostModal, setPost } from '../../redux/post-preview-slice'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './index.scss'
import { Title } from '../Title'

export function PostModal () {
  const initialState = {
    title: '',
    text: '',
    image: '',
    description: ''
  }
  const isShowModal = useSelector(state => state.postPreview.isShowPostModal)
  const id = useSelector(state => state.postPreview.postId)
  const [currentId, setCurrentId] = useState()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(isShowModal)
  const [currentPost, setCurrentPost] = useState(initialState)
  const posts = useSelector(state => state.posts.list)

  useEffect(() => {
    setCurrentId(id)
  }, [id])

  useEffect(() => {
    setIsOpen(isShowModal)
  }, [isShowModal])

  useEffect(() => {
    setCurrentPost(posts.find(post => post.id === currentId))
  }, [currentId])

  function closeModal () {
    dispatch(setPost(null))
    dispatch(hidePostModal())
  }

  function handleClickLeft () {
    const length = posts.length
    if (currentId === 1) {
      setCurrentId(length)
      dispatch(setPost(length))
    } else {
      setCurrentId(currentId - 1)
      dispatch(setPost(currentId - 1))
    }
  }

  function handleClickRight () {
    const length = posts.length
    if (currentId === length) {
      setCurrentId(1)
      dispatch(setPost(1))
    } else {
      setCurrentId(currentId + 1)
      dispatch(setPost(currentId + 1))
    }
  }

  if (!isOpen) return null

  return (
    <div className="my-modal-container">
      <div className="my-modal-backdrop" onClick={closeModal} />
      <div className="my-modal-content d-flex align-items-center gap-3">
        <FaAngleLeft className="my-modal-arrow fs-4" onClick={handleClickLeft}/>
        <div>
          <Title>{currentPost?.title}</Title>
          <img src={`${currentPost?.image}`} style={{ height: '300px', objectFit: 'cover', margin: '0 auto' }}/>
          <p>{currentPost?.text}</p>
          <p>{currentPost?.description}</p>
        </div>
        <FaAngleRight className="my-modal-arrow fs-4" onClick={handleClickRight}/>
      </div>
    </div>
  )
}
