import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NumberField from '.'

describe('<NumberField />', () => {
  it('should render the Number input', () => {
    render(<NumberField />)

    expect(screen.getByRole('spinbutton')).toHaveValue(0)
  })

  it('should render with given initial value', () => {
    render(<NumberField initialValue={10} />)

    expect(screen.getByRole('spinbutton')).toHaveValue(10)
  })

  it('should render with label', () => {
    render(<NumberField label="field label" name="field name" />)

    expect(screen.getByLabelText(/field label/i)).toBeInTheDocument()
  })

  it('should dispatch onChange with correct number value', async () => {
    const onChange = jest.fn()
    render(<NumberField initialValue={1} onChange={onChange} />)

    const numberField = screen.getByRole('spinbutton')

    expect(numberField).toHaveValue(1)

    userEvent.clear(numberField)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    expect(numberField).toHaveValue(null)
    expect(onChange).toHaveBeenCalledWith(0)

    userEvent.type(numberField, '10')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3)
    })
    expect(numberField).toHaveValue(10)
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('should handle the max value', async () => {
    const onChange = jest.fn()
    render(<NumberField initialValue={1} max={100} onChange={onChange} />)

    const numberField = screen.getByRole('spinbutton')

    expect(numberField).toHaveValue(1)

    // 1 + 0 = 10
    userEvent.type(numberField, '0')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    expect(numberField).toHaveValue(10)
    expect(onChange).toHaveBeenCalledWith(10)

    // 10 + 0 = 100
    userEvent.type(numberField, '0')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
    expect(numberField).toHaveValue(100)
    expect(onChange).toHaveBeenCalledWith(100)

    // 100 + 0 = 1000 which is more than the max value
    // should not update the number
    userEvent.type(numberField, '0')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
    expect(numberField).toHaveValue(100)
    expect(onChange).toHaveBeenCalledWith(100)
  })

  it('should handle the min value', async () => {
    const initialValue = 0
    const onChange = jest.fn()

    render(
      <NumberField initialValue={initialValue} min={-10} onChange={onChange} />
    )

    const numberField = screen.getByRole('spinbutton')

    expect(numberField).toHaveValue(initialValue)

    userEvent.clear(numberField)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    // -1
    userEvent.type(numberField, '-1')
    await waitFor(() => {
      // it doesn't not call onChange when add '-'
      // so it will call 1 time to type '-1'
      expect(onChange).toHaveBeenCalledTimes(2)
    })
    expect(onChange).toHaveBeenCalledWith(-1)

    // -1 + 0 = -10
    userEvent.type(numberField, '0')
    await waitFor(() => {
      // it doesn't not call onChange when add '-'
      // so it will call 1 time to type '-1'
      expect(onChange).toHaveBeenCalledTimes(3)
    })
    expect(onChange).toHaveBeenCalledWith(-10)

    // -10 + 0 = -100
    userEvent.type(numberField, '0')
    await waitFor(() => {
      // it doesn't not call onChange when add '-'
      // so it will call 1 time to type '-1'
      expect(onChange).toHaveBeenCalledTimes(3)
    })
    expect(onChange).toHaveBeenCalledWith(-10)
  })

  it('should render disabled', async () => {
    const onChange = jest.fn()
    const initialValue = 10
    render(
      <NumberField initialValue={initialValue} onChange={onChange} disabled />
    )

    const numberField = screen.getByRole('spinbutton')
    expect(numberField).toHaveValue(initialValue)

    expect(numberField).toBeDisabled()

    userEvent.type(numberField, '0')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(0)
    })
    expect(numberField).toHaveValue(initialValue)

    // should have cursor not allowed
    expect(numberField.className).toContain('cursor-not-allowed')
  })
})
