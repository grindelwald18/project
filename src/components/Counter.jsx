import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../redux/actions/counter-action'
export function Counter () {
  const counter = useSelector(state => state.counter.counter)
  const dispatch = useDispatch()

  function handelClickIncrement () {
    dispatch(increment())
  }

  function handelClickDecrement () {
    dispatch(decrement())
  }

  return (
    <div className="d-flex gap-2 ">
      <h1>{counter}:</h1>
      <button className="btn btn-primary" onClick={handelClickIncrement}>Increment</button>
      <button className="btn btn-primary" onClick={handelClickDecrement}>Decrement</button>
    </div>
  )
}
