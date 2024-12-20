import { Link } from 'react-router-dom'
export function GoHome (props) {
  return (
      <div className="d-flex flex-column justify-content-center m-auto " style={{ width: '50%', padding: '40px', border: '1px solid rgba(218, 218, 218, 1)' }}>
        <p className="p-3">{props.text}</p>
        <Link className="btn btn-primary d-flex justify-content-center align-content-center" to="/posts/pages/1">{props.buttonText}</Link>
      </div>
  )
}
