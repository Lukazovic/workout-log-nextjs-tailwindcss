import { render, screen } from '@testing-library/react'

import WorkoutTable from '.'

import { items } from './TableData/mock'

jest.mock('components/WorkoutTable/TableHeader', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <tr data-testid="Mock TableHeader"></tr>
    }
  }
})

jest.mock('components/WorkoutTable/TableData', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <tr data-testid="Mock TableData"></tr>
    }
  }
})

describe('<WorkoutTable />', () => {
  it('should render with TableHeader and TableData components', () => {
    render(<WorkoutTable items={items} />)

    expect(screen.getByTestId('Mock TableHeader')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock TableData')).toHaveLength(items.length)
  })
})
