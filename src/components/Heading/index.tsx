type HeadingOptions = 'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSizes =
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
type HeadingColors = 'dark' | 'light'

export type HeadingProps = {
  className?: string
  as?: HeadingOptions
  size?: HeadingSizes
  color?: HeadingColors
  children: React.ReactNode
}

const TEXT_COLORS = {
  dark: 'text-gray-900',
  light: 'text-gray-100'
}

const Heading = ({
  className = '',
  as = 'h1',
  size = '4xl',
  color = 'dark',
  children
}: HeadingProps) => {
  const fontColor = TEXT_COLORS[color]
  const style = `font-bold text-${size} ${fontColor} ${className}`.trim()

  if (as === 'h1') {
    return <h1 className={style}>{children}</h1>
  }

  if (as === 'h2') {
    return <h2 className={style}>{children}</h2>
  }

  if (as === 'h3') {
    return <h3 className={style}>{children}</h3>
  }

  if (as === 'h4') {
    return <h4 className={style}>{children}</h4>
  }

  if (as === 'h5') {
    return <h5 className={style}>{children}</h5>
  }

  return <h6 className={style}>{children}</h6>
}

export default Heading
