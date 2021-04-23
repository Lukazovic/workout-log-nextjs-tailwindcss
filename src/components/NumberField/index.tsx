import { useState, InputHTMLAttributes } from 'react'

export type NumberFieldProps = {
  className?: string
  label?: string
  name?: string
  initialValue?: number
  disabled?: boolean
  max?: number
  min?: number
  onChange?: (value: number) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const NumberField = ({
  className = '',
  label,
  name,
  initialValue,
  disabled,
  max,
  min,
  onChange,
  ...props
}: NumberFieldProps) => {
  const [value, setValue] = useState(initialValue && String(initialValue))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    if (!!max && Number(newValue) > max) return
    if (!!min && Number(newValue) < min) return

    setValue(newValue)

    !Number.isNaN(newValue) && !!onChange && onChange(Number(newValue))
  }

  return (
    <div className={`flex flex-col ${className}`.trim()}>
      {!!label && (
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full border-gray-300 focus:border-primary-400 focus:outline-primary-400 rounded shadow-sm ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        type="number"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        max={max}
        min={min}
        {...(label ? { id: name } : {})}
      />
    </div>
  )
}

export default NumberField
