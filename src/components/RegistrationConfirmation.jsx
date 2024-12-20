import { useSelector } from 'react-redux'
import { GoHome } from './GoHome'
import { Title } from './Title'
import { text } from '../config/text'

export function RegistrationConfirmation () {
  const lang = useSelector(state => state.lang.value)
  return (
    <>
      <Title title={text[lang].registrationConfirmation.title}></Title>
      <GoHome text={text[lang].registrationConfirmation.text} buttonText={text[lang].registrationConfirmation.buttonText}/>
    </>
  )
}
