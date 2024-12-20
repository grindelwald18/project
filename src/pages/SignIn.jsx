import { SignInForm } from '../components/signIn/SignInForm'
import { text } from '../config/text'
import { Title } from '../components/Title'
import { useSelector } from 'react-redux'
export function SignIn () {
  const lang = useSelector(state => state.lang.value)
  return (
    <>
      <Title>{text[lang].signIn.title} </Title>
      <SignInForm/>
    </>
  )
}
