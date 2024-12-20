import { useState } from 'react'
export function Input ({ focus, name, onChange, label, id, type }) {
  const [value, setValue] = useState('')
  const handleChange = (inputValue) => {
    setValue(inputValue.target.value)
    onChange({ target: { name, value: inputValue.target.value } })
  }

  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="form-label"
        >
        {label}
      </label>
      <input
        ref={focus}
        type={type}
        className="form-control"
        value={value}
        onChange={handleChange}
        id={id}
        />
    </div>
  )
}
