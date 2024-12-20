import { Link } from 'react-router-dom'
import './index.scss' // Импортируйте CSS для стилей, если необходимо

export function NotFound () {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>К сожалению, запрашиваемая вами страница не существует.</p>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  )
}
