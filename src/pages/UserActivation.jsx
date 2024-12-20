import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivation } from '../redux/auth-slice'

export function UserActivation () {
  const { uid, token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activationStatus = useSelector(state => state.auth.activationStatus)

  useEffect(() => {
    dispatch(fetchActivation({ uid, token }))
  }, [uid, token, dispatch])

  useEffect(() => {
    if (activationStatus) {
      navigate('/auth/activate/successful')
    }
  }, [activationStatus, navigate])

  return (
    <div>Activation...</div>
  )
}
