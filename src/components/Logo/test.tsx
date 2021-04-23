import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('<Logo />', () => {
  it('should match snapshot', () => {
    const { container } = render(<Logo />)

    expect(container).toMatchSnapshot()
  })

  it('should render correctly', () => {
    render(<Logo />)

    expect(
      screen.getByRole('img', { name: /workout log/i })
    ).toBeInTheDocument()
  })

  it('should render with passed class', () => {
    const className = 'some tailwind styles'
    render(<Logo className={className} />)

    const svgLogo = screen.getByRole('img', { name: /workout log/i })

    expect(svgLogo.parentElement).toHaveClass(className)
  })
})
