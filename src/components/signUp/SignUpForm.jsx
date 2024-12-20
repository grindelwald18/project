import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { text } from '../../config/text'
import { login, fetchSignUp, fetchCurrentUser, logout } from '../../redux/auth-slice'
import { Input } from '../formElements/Input'
import { useNavigate } from 'react-router-dom'
export function SignUpForm () {
  const lang = useSelector(state => state.lang.value)
  const error = useSelector(state => state.auth.error)
  const [isAuth, setIsAuth] = useState(false)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth && !error) {
      dispatch(login())
      navigate('/registration-confirmation')
    }
  }, [isAuth, navigate, error])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
    } else {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        course_group: 8
      }

      try {
        dispatch(logout())
        await dispatch(fetchSignUp(userData))
        dispatch(fetchCurrentUser())
        setIsAuth(true)
      } catch (error) {
        console.error('Error during sign up:', error)
        alert(text[lang].signUp.error)
      }
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <form className="w-50 g-2" onSubmit={handleSubmit}>
      <Input label={text[lang].signUp.form.name} type="text" id="inputName" name="username" onChange={handleInputChange}/>
      {/* <Input focus={InputFocusRef} label={text[lang].signUp.form.email} type="email" id="inputEmail" name="email" onChange={handleInputChange} /> */}
      <Input label={text[lang].signUp.form.email} type="email" id="inputEmail" name="email" onChange={handleInputChange} />
      <Input label={text[lang].signUp.form.password} type="password" id="inputPassword" name="password" onChange={handleInputChange}/>
      <Input label={text[lang].signUp.form.confirmPassword} type="password" id="inputConfirmPassword" name="confirmPassword" onChange={handleInputChange}/>
        <button type="submit" className="btn btn-primary">
          {text[lang].signUp.form.submit}
        </button>
      </form>
    </div>
  )
}
