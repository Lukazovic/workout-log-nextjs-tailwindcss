import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DateField from '.'

describe('<DateField />', () => {
  it('should render correctly', () => {
    render(<DateField />)

    expect(screen.getByRole('date-picker')).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<DateField label="date picker label" name="date" />)

    expect(screen.getByLabelText(/date picker label/i)).toBeInTheDocument()
  })

  it('should render with initial value', () => {
    render(<DateField initialValue="2021-04-19" />)

    const dateField = screen.getByRole('date-picker')

    expect(dateField).toHaveValue('2021-04-19')
  })

  it('should render with initial value', () => {
    render(<DateField initialValue="2021-04-19" />)

    const dateField = screen.getByRole('date-picker')

    expect(dateField).toHaveValue('2021-04-19')
  })

  it('should dispatch onChange with correct value', async () => {
    const onChange = jest.fn()
    render(<DateField initialValue="2000-01-15" onChange={onChange} />)

    const dateField = screen.getByRole('date-picker')

    userEvent.type(dateField, '2021-04-19')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    expect(dateField).toHaveValue('2021-04-19')
  })

  it('should render disabled date filed', async () => {
    render(<DateField disabled />)

    const dateField = screen.getByRole('date-picker')

    expect(dateField).toBeInTheDocument()
    expect(dateField).toBeDisabled()
  })

  it('should not dispatch onChange when disabled', async () => {
    const onChange = jest.fn()
    render(<DateField initialValue="2000-01-15" onChange={onChange} disabled />)

    const dateField = screen.getByRole('date-picker')

    expect(dateField).toHaveValue('2000-01-15')
    userEvent.type(dateField, '2021-04-19')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(0)
    })
    expect(dateField).toHaveValue('2000-01-15')
  })
})
