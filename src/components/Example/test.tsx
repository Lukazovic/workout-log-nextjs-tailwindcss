import { render, screen } from '@testing-library/react'

import Example from '.'

describe('<Example />', () => {
  it('should render Example heading', () => {
    const { container } = render(<Example />)

    expect(
      screen.getByRole('heading', { name: /example/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/A component example with TailwindCSS/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: /tailwindcss logo/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
