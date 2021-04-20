import { useState, InputHTMLAttributes } from 'react'

export type DateFieldProps = {
  label?: string
  name?: string
  initialValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const DateField = ({
  label,
  name,
  initialValue,
  disabled,
  onChange,
  ...props
}: DateFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setValue(newValue)

    !!onChange && onChange(newValue)
  }

  return (
    <div className="flex flex-col">
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
        className={`w-full border-gray-300 focus:border-primary-400 focus:outline-primary-400 rounded shadow-sm${
          disabled ? ' cursor-not-allowed' : 'cursor-text'
        }`}
        type="date"
        role="date-picker"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        {...(label ? { id: name } : {})}
      />
    </div>
  )
}

export default DateField
