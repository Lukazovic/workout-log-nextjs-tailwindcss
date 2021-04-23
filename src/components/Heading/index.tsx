type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingColors = 'dark' | 'light'

export type HeadingProps = {
  className?: string
  level?: HeadingLevels
  color?: HeadingColors
  children: React.ReactNode
}

const DEFAULT_STYLES = 'font-bold'

const TEXT_COLORS = {
  dark: 'text-gray-900',
  light: 'text-gray-100'
}

const Heading = ({
  className = '',
  level = 'h2',
  color = 'dark',
  children
}: HeadingProps) => {
  const fontColor = TEXT_COLORS[color]
  const style = `${`${DEFAULT_STYLES} ${className}`.trim()} ${fontColor}`.trim()

  if (level === 'h1') {
    return <h1 className={style}>{children}</h1>
  }

  if (level === 'h2') {
    return <h2 className={style}>{children}</h2>
  }

  if (level === 'h3') {
    return <h3 className={style}>{children}</h3>
  }

  if (level === 'h4') {
    return <h4 className={style}>{children}</h4>
  }

  if (level === 'h5') {
    return <h5 className={style}>{children}</h5>
  }

  return <h6 className={style}>{children}</h6>
}

export default Heading
