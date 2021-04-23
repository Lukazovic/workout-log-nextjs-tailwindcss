import { render, screen } from '@testing-library/react'

import Heading from '.'

describe('<Heading />', () => {
  it('should render a h2 heading by default', () => {
    render(<Heading>Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 2, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render a h1 heading', () => {
    render(<Heading level="h1">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 1, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render a h3 heading', () => {
    render(<Heading level="h3">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 3, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render a h4 heading', () => {
    render(<Heading level="h4">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 4, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render a h5 heading', () => {
    render(<Heading level="h5">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 5, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render a h6 heading', () => {
    render(<Heading level="h6">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 6, name: /heading text/i })
    ).toBeInTheDocument()
  })

  it('should render with dark color by default', () => {
    render(<Heading>Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 2, name: /heading text/i })
    ).toHaveAttribute('class', 'font-bold text-gray-900')
  })

  it('should render with light color', () => {
    render(<Heading color="light">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { level: 2, name: /heading text/i })
    ).toHaveAttribute('class', 'font-bold text-gray-100')
  })
})
