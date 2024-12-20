import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Title } from '../Title'
import { text } from '../../config/text'
import './index.scss'
export function PostsLayout () {
  const lang = useSelector(state => state.lang.value)
  const location = useLocation()
  const isActiveLink = (path) => {
    return location.pathname === path
  }
  return (
    <>
      <Title>{text[lang].postPage.title}</Title>
      <div className='d-flex gap-2 mb-3'>
        <Link
          to='/posts/pages/1'
          className={`text-decoration-none fs-5 fw-bold nav-item ${isActiveLink('/posts/pages/1') ? 'active' : ''}`}
        >
          {text[lang].postPage.subsection.all}
        </Link>
        <Link
          to='/posts/favorite'
          className={`text-decoration-none fs-5 fw-bold nav-item ${isActiveLink('/posts/favorite') ? 'active' : ''}`}
        >
          {text[lang].postPage.subsection.favorite}
        </Link>
        <Link
          to='/posts/popular'
          className={`text-decoration-none fs-5 fw-bold nav-item ${isActiveLink('/posts/popular') ? 'active' : ''}`}
        >
          {text[lang].postPage.subsection.popular}
        </Link>
        <div className='d-flex ms-auto gap-2' style={{ height: '40px' }}>
          <h3 >{text[lang].postPage.select.label}</h3>
          <select className="form-select">
            <option value="title">{text[lang].postPage.select.title}</option>
            <option value="date">{text[lang].postPage.select.date}</option>
            <option value="lesson_num">{text[lang].postPage.select.lesson}</option>
            <option value="author">{text[lang].postPage.select.author}</option>
          </select>
        </div>
      </div>
      <Outlet />
    </>
  )
}
