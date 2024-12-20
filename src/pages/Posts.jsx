import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { MediumPost } from '../components/mediumPost/MediumPost'
import { PostModal } from '../components/modalForPost'
import { Modal } from '../components/modalForImage'
import { fetchPosts } from '../redux/posts-slice'

export function Posts () {
  const auth = useSelector(state => state.auth.isAuth)
  const postInStore = useSelector(state => state.posts.list)
  const error = useSelector(state => state.posts.error)
  const { page: currentPage } = useParams()
  const isLoading = useSelector(state => state.posts.isLoading)
  const pagesCount = useSelector(state => state.posts.pagesCount)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage || 1 }))
  }, [currentPage])

  function buildPaginationScheme () {
    const prevPageNumber = +currentPage - 1 // предполагаемая предыдущая страница, может получиться отрицательной
    const nextPageNumber = +currentPage + 1 // предполагаемая следующая страница, может получиться больше максимальной
    const scheme = [1, prevPageNumber, +currentPage, nextPageNumber, pagesCount] // строим схему
    const filteredScheme = scheme.filter(item => item > 0 && item <= pagesCount) // чистим те, которые меньше 0 или больше pagesCounter
    const set = new Set(filteredScheme) // удаляем дубли
    const result = Array.from(set) // обратно приводим к массиву

    if (result[0] + 1 !== result[1]) result.splice(1, 0, '...') // если между первым и вторым элементом пропуск, вставляем ...
    if (result.at(-2) + 1 !== result.at(-1)) result.splice(result.length - 1, 0, '...') // если между последним и предпоследним пропуск, вставляем ...

    return result
  }

  function renderPosts () {
    if (error) {
      return <h1>{error}</h1>
    }
    if (isLoading) {
      return <h1>Loading...</h1>
    }

    return postInStore.map((post) => {
      return (
        <MediumPost image={post.image} key={post.id} id={post.id} title={post.title} text={post.text} type={post.cardType}/>
      )
    })
  }

  function renderPagination () {
    if (!pagesCount) return null

    const paginationScheme = buildPaginationScheme()

    return (
      <div className="m-auto">
        <ul className="pagination ">
          {paginationScheme.map((item, index) => {
            if (item === '...') {
              return (
                <li className="page-item" key={index}>
                  <span className="page-link">...</span>
                </li>
              )
            }

            return (
              <li className="page-item" key={index}>
                <NavLink className="page-link" to={`/posts/pages/${item}`}>
                  {item}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (!auth) {
    return (<Navigate to="/auth/signin"/>)
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-3">
        {renderPosts()}
        <PostModal/>
        <Modal/>
        {renderPagination()}
      </div>
    </>
  )
}
