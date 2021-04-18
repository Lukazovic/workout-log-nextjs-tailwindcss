import { render, screen } from '@testing-library/react'

import HomeLayout from '.'

jest.mock('components/Example', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Example"></div>
    }
  }
})

describe('<HomeLayout />', () => {
  it('should render Example Component', () => {
    render(<HomeLayout />)

    expect(screen.getByTestId('Mock Example')).toBeInTheDocument()
  })
})
