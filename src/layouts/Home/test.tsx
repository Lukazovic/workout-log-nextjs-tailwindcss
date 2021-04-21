import { render, screen } from '@testing-library/react'

import HomeLayout from '.'

jest.mock('components/AddWorkoutForm', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock AddWorkoutForm"></div>
    }
  }
})

describe('<HomeLayout />', () => {
  it('should render AddWorkoutForm Component', () => {
    render(<HomeLayout />)

    expect(screen.getByTestId('Mock AddWorkoutForm')).toBeInTheDocument()
  })
})
