import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = {
  fullWidth?: boolean
  minimal?: boolean
  icon?: React.ReactNode
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const DEFAULT_STYLES =
  'rounded px-3 py-2 transition-colors duration-500  transition-colors duration-500 border'

const PRIMARY_STYLES = `${DEFAULT_STYLES} bg-primary-700 border border-primary-700 text-white`
const PRIMARY_HOVER_STYLES = `hover:bg-primary-600 hover:border-primary-600`

const MINIMAL_STYLES = `${DEFAULT_STYLES} bg-transparent border-primary-700 text-primary-700`
const MINIMAL_HOVER_STYLES = `hover:border-primary-600 hover:text-primary-600`

const Button = ({
  fullWidth = false,
  minimal = false,
  icon,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const primaryStyles = `${PRIMARY_STYLES} ${
    disabled ? 'cursor-not-allowed' : `${PRIMARY_HOVER_STYLES}`
  }`
  const minimalStyles = `${MINIMAL_STYLES} ${
    disabled ? 'cursor-not-allowed' : `${MINIMAL_HOVER_STYLES}`
  }`

  const styles = minimal ? minimalStyles : primaryStyles

  return (
    <button
      className={`${styles}${fullWidth ? ' w-full' : ''}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {!!children && (
        <span className={icon ? 'ml-3' : undefined}>{children}</span>
      )}
    </button>
  )
}

export default Button
