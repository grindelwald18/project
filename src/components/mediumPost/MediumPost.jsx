import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { setId, showModal } from '../../redux/post-image-slice'
import { setPost, showPostModal } from '../../redux/post-preview-slice'
import { IoEyeSharp } from 'react-icons/io5'
import './MediumPostStyle.scss'
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { likePost, dislikePost, makeFavorite } from '../../redux/posts-slice'

export function MediumPost ({ image, id, title, text, type }) {
  const dispatch = useDispatch()
  const postInStore = useSelector(state => state.posts.list.find(post => post.id === id))
  const isFavorite = postInStore?.isFavorite
  const status = postInStore?.status
  const location = useLocation()
  const isMyPost = useMemo(() => location.pathname === '/posts/my')

  const handleClickImage = () => {
    dispatch(setId(id))
    dispatch(showModal())
  }

  const handleClickEye = () => {
    dispatch(setPost(id))
    dispatch(showPostModal())
  }

  const checkLike = () => {
    if (status === 'liked') {
      return <BiSolidLike style={{ fontSize: '25px' }}/>
    } else {
      return <BiLike style={{ fontSize: '25px' }}/>
    }
  }

  const checkDisLike = () => {
    if (status === 'disliked') {
      return <BiSolidDislike style={{ fontSize: '25px' }}/>
    } else {
      return <BiDislike style={{ fontSize: '25px' }}/>
    }
  }

  const checkIsFavorite = () => {
    if (isFavorite) {
      return <FaBookmark style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => dispatch(makeFavorite(id - 1))}/>
    } else {
      return <FaRegBookmark style={{ fontSize: '25px', cursor: 'pointer' }} onClick={() => dispatch(makeFavorite(id - 1))}/>
    }
  }

  return (
    <div className='my-card overflow-hidden d-flex' style={{ gap: '20px', overflow: 'hidden', border: '1px solid grey', borderRadius: '12px' }}>
      <img onClick={handleClickImage} src={`${image}`} style={ { backgroundSize: 'cover', width: '200px', height: '200px', cursor: 'pointer' }} />
      <Link to={`/post/${id}`} key={id} style={{ textDecoration: 'none' }} >
        <div className="card-body" style={{ marginTop: '20px' }}>
          <h5 className="card-title">{title}</h5>
        </div>
      </Link>
      {isMyPost
        ? null
        : <div className="ms-auto me-3 mt-3 d-flex flex-column gap-2">
        <IoEyeSharp onClick={handleClickEye} style={{ fontSize: '25px', cursor: 'pointer' }}/>
        <div onClick={() => dispatch(likePost(id - 1))} style={{ cursor: 'pointer' }}>{checkLike()}</div>
        <div onClick={() => dispatch(dislikePost(id - 1))} style={{ cursor: 'pointer' }}>{checkDisLike()}</div>
        {checkIsFavorite()}
      </div>
      }
    </div>
  )
}
