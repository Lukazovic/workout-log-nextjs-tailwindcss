import { render, screen } from '@testing-library/react'

import Divider from '.'

describe('<Divider />', () => {
  it('should render the correctly', () => {
    render(<Divider />)

    expect(screen.getByRole('divider')).toBeInTheDocument()
    expect(screen.getByRole('divider')).toHaveClass('border-t-2 border-black')
  })
})
