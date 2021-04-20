import { render, screen } from '@testing-library/react'

import WorkoutTable from '.'

describe('<WorkoutTable />', () => {
  it('should render the heading', () => {
    render(<WorkoutTable />)

    expect(
      screen.getByRole('heading', { name: /WorkoutTable/i })
    ).toBeInTheDocument()
  })
})
