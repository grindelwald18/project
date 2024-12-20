import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { text } from '../config/text'

export function SearchForm () {
  const lang = useSelector((state) => state.lang.value)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleChangeSearch (event) {
    setSearch(event.target.value)
  }

  function handleSubmit (event) {
    event.preventDefault()
    navigate(`/posts/search/${search}`)
  }

  return (
    <form className="d-flex align-items-center ms-3" role="search" onSubmit={handleSubmit}>
      <input type="search" className="form-control me-1" placeholder={text[lang].searchForm.placeholder} style={{ width: '200px' }} onChange={handleChangeSearch} value={search} />
      <button type="submit" className="btn btn-warning">{text[lang].searchForm.button}</button>
    </form>
  )
}
