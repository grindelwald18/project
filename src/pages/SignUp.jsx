import { useSelector } from 'react-redux'
import { text } from '../config/text'
import { SignUpForm } from '../components/signUp/SignUpForm'
import { Title } from '../components/Title'
export function SignUp () {
  const lang = useSelector(state => state.lang.value)
  return (
    <>
      <Title>{text[lang].signUp.title}</Title>
      <SignUpForm />
    </>
  )
}
