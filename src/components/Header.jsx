import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeLang } from '../redux/lang-slice'
import { NavLink, useNavigate } from 'react-router-dom'
import { text } from '../config/text'
import { logout, fetchCurrentUser } from '../redux/auth-slice'
import { SearchForm } from './SearchForm'

export function Header () {
  const [langValue, setLangValue] = useState('en')
  const lang = useSelector(state => state.lang.value)
  const isAuth = useSelector(state => state.auth.isAuth)
  const currentUser = useSelector(state => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChangeLang = (event) => {
    setLangValue(event.target.value)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(changeLang(langValue))
  }, [langValue])

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCurrentUser())
      navigate('/posts/pages/1')
    }
  }, [])

  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <span className="navbar-brand">Blog</span>
        <div className="navbar-nav flex-row align-items-center">
          <NavLink className="nav-link px-2" aria-current="page" to="/posts/pages/1">{text[lang].header.home}</NavLink>
          { isAuth && currentUser
            ? <>
                <NavLink className="nav-link px-2" to="/posts/my">{text[lang].header.my_posts}</NavLink>
                <SearchForm />
                <div className="px-3 ">{currentUser?.email} </div>
                <button className="btn btn-primary ms-2" type="button" onClick={handleLogout}>{text[lang].header.logout}</button>
              </>
            : <>
                <NavLink className="nav-link px-2" to="/auth/signin">{text[lang].header.sign_in}</NavLink>
                <NavLink className="nav-link px-2" to="/auth/signup">{text[lang].header.sign_up}</NavLink>
            </>
          }
          <select className="form-select ms-3" style={{ width: '80px' }} value={langValue} onChange={handleChangeLang}>
            <option value="en">En</option>
            <option value="ru">Ru</option>
          </select>
        </div>
      </div>
    </nav>
  )
}
