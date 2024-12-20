import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '../formElements/Input'
import { text } from '../../config/text'
import { fetchCurrentUser, fetchSignIn } from '../../redux/auth-slice'
import { useNavigate } from 'react-router-dom'

export function SignInForm () {
  const [formData, setFormData] = useState({})
  // const InputFocusRef = useRef(null)
  const lang = useSelector((state) => state.lang.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   setTimeout(() => {
  //     InputFocusRef.current.focus()
  //   }, 50)
  // }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(fetchSignIn(formData))
    dispatch(fetchCurrentUser())
    navigate('/posts/pages/1')
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <form className="w-50 g-2" onSubmit={handleSubmit}>
          <Input
            label={text[lang].signIn.form.email}
            type="email"
            id="inputEmail"
            name="email"
            onChange={handleInputChange}
          />
          <Input
            label={text[lang].signIn.form.password}
            type="password"
            id="inputPassword"
            name="password"
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" type="submit">
            {text[lang].signIn.form.submit}
          </button>
        </form>
      </div>
    </>
  )
}
