import { render, screen } from '@testing-library/react'

import Empty from '.'

describe('<Empty />', () => {
  it('should render the heading', () => {
    render(<Empty />)

    expect(screen.getByRole('img')).toHaveAttribute(
      'data-icon',
      'calendar-times'
    )

    expect(
      screen.getByRole('heading', { level: 4, name: /no exercises yet!/i })
    ).toBeInTheDocument()
  })
})
