import { screen } from '@testing-library/react'
import { renderInTableBody } from 'utils/tests/helpers'

import TableHeader from '.'

describe('<TableHeader />', () => {
  it('should render with "time", "type" and "date"', () => {
    renderInTableBody(<TableHeader />)

    expect(screen.getByText('Time')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
  })
})
