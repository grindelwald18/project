import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal, setId } from '../../redux/post-image-slice'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './index.scss'

export function Modal () {
  const isShowModal = useSelector(state => state.postImagePreview.isShowModal)
  const id = useSelector(state => state.postImagePreview.id)
  const [currentId, setCurrentId] = useState()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(isShowModal)
  const [image, setImage] = useState('')
  const posts = useSelector(state => state.posts.list)

  useEffect(() => {
    setCurrentId(id)
  }, [id])

  useEffect(() => {
    setIsOpen(isShowModal)
  }, [isShowModal])

  useEffect(() => {
    setImage(posts.find(post => post.id === currentId)?.image)
  }, [currentId])

  function closeModal () {
    dispatch(setId(0))
    dispatch(hideModal())
  }

  function handleClickLeft () {
    const length = posts.length
    if (currentId === 1) {
      setCurrentId(length)
    } else {
      setCurrentId(currentId - 1)
    }
  }

  function handleClickRight () {
    const length = posts.length
    if (currentId === length) {
      setCurrentId(1)
    } else {
      setCurrentId(currentId + 1)
    }
  }

  if (!isOpen) return null

  return (
    <div className="my-modal-container">
      <div className="my-modal-backdrop" onClick={closeModal} />
      <div className="my-modal-content d-flex align-items-center gap-3">
        <FaAngleLeft className="my-modal-arrow fs-4" onClick={handleClickLeft}/>
        <img src={image} alt="Modal" className="my-modal-image" style={{ width: '500px', height: '500px' }} />
        <FaAngleRight className="my-modal-arrow fs-4" onClick={handleClickRight}/>
      </div>
    </div>
  )
}
