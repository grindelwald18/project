import { useSelector } from 'react-redux'
import { GoHome } from '../components/GoHome'
import { Title } from '../components/Title'
import { text } from '../config/text'

export function Successful () {
  const lang = useSelector(state => state.lang.value)
  return (
    <>
      <Title title={text[lang].successful.title}></Title>
      <GoHome text={text[lang].successful.text} buttonText={text[lang].successful.buttonText}/>
    </>
  )
}
