import { render, screen } from '@testing-library/react'

import Heading from '.'

describe('<Heading />', () => {
  it('should render only a h1 heading by default', () => {
    const { container } = render(<Heading>Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(container.querySelectorAll('h2')).toHaveLength(0)
    expect(container.querySelectorAll('h3')).toHaveLength(0)
    expect(container.querySelectorAll('h4')).toHaveLength(0)
    expect(container.querySelectorAll('h5')).toHaveLength(0)
    expect(container.querySelectorAll('h6')).toHaveLength(0)

    expect(container.parentElement).toMatchSnapshot()
  })

  it('should render only a h2 heading', () => {
    const { container } = render(<Heading as="h2">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h2')).toHaveLength(1)
  })

  it('should render only a h3 heading', () => {
    const { container } = render(<Heading as="h3">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h3')).toHaveLength(1)
  })

  it('should render only a h4 heading', () => {
    const { container } = render(<Heading as="h4">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h4')).toHaveLength(1)
  })

  it('should render only a h5 heading', () => {
    const { container } = render(<Heading as="h5">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h5')).toHaveLength(1)
  })

  it('should render only a h6 heading', () => {
    const { container } = render(<Heading as="h6">Heading text</Heading>)

    expect(
      screen.getByRole('heading', { name: /heading text/i })
    ).toBeInTheDocument()
    expect(container.querySelectorAll('h6')).toHaveLength(1)
  })

  it('should render with dark color by default', () => {
    render(<Heading>Heading text</Heading>)

    expect(
      screen.getByRole(Heading, { name: /heading text/i })
    ).toHaveAttribute('class', 'font-bold text-4xl text-gray-900')
  })

  it('should render with light color', () => {
    render(<Heading color="light">Heading text</Heading>)

    expect(
      screen.getByRole(Heading, { name: /heading text/i })
    ).toHaveAttribute('class', 'font-bold text-4xl text-gray-100')
  })
})
