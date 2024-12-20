import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { text } from '../config/text'
import { SelectedPosts } from '../components/SelectedPosts'
import { Title } from '../components/Title'
import { fetchPosts } from '../redux/posts-slice'
export function SearchResults (props) {
  const { query } = useParams()
  const lang = useSelector(state => state.lang.value)
  const posts = useSelector(state => state.posts.list)
  // const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()
  // const navigate = Navigate()

  // if (!isAuth) {
  //   navigate('/auth/signin')
  // }

  useEffect(() => {
    dispatch(fetchPosts({ search: query }))
  }, [query, dispatch])

  return (
    <>
      <Title>{text[lang].searchResults.title}</Title>
      <SelectedPosts posts={posts}/>
    </>
  )
}
