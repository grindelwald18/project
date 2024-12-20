import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MediumPost } from '../components/mediumPost/MediumPost'
import { PostModal } from '../components/modalForPost'
import { Modal } from '../components/modalForImage'

export function Favorite () {
  const auth = useSelector(state => state.auth.isAuth)
  const postInStore = useSelector(state => state.posts.list.filter(post => post.isFavorite))

  function renderPosts () {
    return postInStore.map((post) => {
      return (
        <MediumPost image={post.image} key={post.id} id={post.id} title={post.title} text={post.text} type={post.cardType}/>
      )
    })
  }

  if (!auth) {
    return (<Navigate to="/auth/signin"/>)
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between gap-3">
        {renderPosts()}
        <PostModal/>
        <Modal/>
      </div>
    </>
  )
}
