import { useState, SelectHTMLAttributes } from 'react'

export type SelectOptionsProps = {
  label: string
  value: string | number
  disabled?: boolean
}

export type SelectFieldProps = {
  className?: string
  label?: string
  initialValue?: string
  disabled?: boolean
  options: SelectOptionsProps[]
  onChange?: (value: string) => void
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>

const SelectField = ({
  className = '',
  name,
  label,
  initialValue,
  disabled,
  options,
  onChange,
  ...props
}: SelectFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value
    setValue(newValue)

    !!onChange && onChange(newValue)
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
      <select
        {...props}
        className={`w-full border-gray-300 focus:border-primary-400 focus:outline-primary-400 rounded shadow-sm ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        {...(label ? { id: name } : {})}
      >
        {options?.map((option) => (
          <option
            key={`select-option-${option.value}`}
            value={option.value}
            disabled={!!option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
