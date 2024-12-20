import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MediumPost } from '../components/mediumPost/MediumPost'
// import { PostModal } from '../components/modalForPost'
import { Modal } from '../components/modalForImage'
import { fetchMyPosts } from '../redux/posts-slice'
import { Title } from '../components/Title'

export function MyPosts () {
  const postInStore = useSelector(state => state.posts.list)
  const error = useSelector(state => state.posts.error)
  const isLoading = useSelector(state => state.posts.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMyPosts())
  }, [])

  function renderPosts () {
    if (error) {
      return <h1>{error}</h1>
    }
    if (isLoading) {
      return <h1>Loading...</h1>
    }

    if (Array.isArray(postInStore) && postInStore.length > 0) {
      return postInStore.map((post) => {
        return (
          <MediumPost image={post.image} key={post.id} id={post.id} title={post.title} text={post.text} type={post.cardType}/>
        )
      })
    } else {
      return <h1>No posts found.</h1>
    }
  }

  // if (!auth) {
  //   return (<Navigate to="/auth/signin"/>)
  // }

  return (
    <>
      <Title className="mt-5">My Posts</Title>
      <div className="d-flex flex-wrap justify-content-between gap-3">
        {renderPosts()}
        {/* <PostModal/> */}
        <Modal/>
      </div>
    </>
  )
}
