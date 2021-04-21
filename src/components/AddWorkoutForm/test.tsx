/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddWorkoutForm from '.'

describe('<AddWorkoutForm />', () => {
  it('should render correctly', () => {
    render(<AddWorkoutForm />)

    expect(
      screen.getByRole('form', { name: /create new workout/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('group', { name: /insert an item/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('date-picker')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('should not dispatch onSubmit with default values', async () => {
    const alertFunction = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(alertFunction)
    const onSubmit = jest.fn()
    render(<AddWorkoutForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /add/i })

    userEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(alertFunction).toHaveBeenCalledTimes(1)
    })
    expect(alertFunction).toHaveBeenCalledWith(
      'Selected duration is not valid!'
    )
  })

  it('should not dispatch onSubmit when no time is provided', async () => {
    const onSubmit = jest.fn()
    const alertFunction = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(alertFunction)

    render(<AddWorkoutForm onSubmit={onSubmit} />)

    const kindSelect = screen.getByRole('combobox')
    userEvent.selectOptions(kindSelect, 'bike')
    await waitFor(() => {})

    const datePicker = screen.getByRole('date-picker')
    userEvent.type(datePicker, '2021-04-19')
    await waitFor(() => {})

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(alertFunction).toHaveBeenCalledTimes(1)
    })
    expect(alertFunction).toHaveBeenCalledWith(
      'Selected duration is not valid!'
    )
  })

  it('should not dispatch onSubmit when kind is not allowed', async () => {
    const onSubmit = jest.fn()
    const alertFunction = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(alertFunction)

    render(<AddWorkoutForm onSubmit={onSubmit} />)

    const numberField = screen.getByRole('spinbutton')
    userEvent.type(numberField, '11')
    await waitFor(() => {})

    const selectField = screen.getByRole('combobox')
    expect(selectField).toHaveValue('nothing')

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(alertFunction).toHaveBeenCalledTimes(1)
    })
    expect(alertFunction).toHaveBeenCalledWith('Selected kind is not valid!')
  })

  it('should not dispatch onSubmit when no date is in the future', async () => {
    const onSubmit = jest.fn()
    const alertFunction = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(alertFunction)

    render(<AddWorkoutForm onSubmit={onSubmit} />)

    const numberField = screen.getByRole('spinbutton')
    userEvent.type(numberField, '11')
    await waitFor(() => {})

    const selectField = screen.getByRole('combobox')
    userEvent.selectOptions(selectField, 'run')
    await waitFor(() => {})

    const datePicker = screen.getByRole('date-picker')

    userEvent.clear(datePicker)
    await waitFor(() => {})

    userEvent.type(datePicker, '9999-12-30')
    await waitFor(() => {})

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(alertFunction).toHaveBeenCalledTimes(1)
    })
    expect(alertFunction).toHaveBeenCalledWith('Selected date is not valid!')
  })

  it('should dispatch onSubmit with correctly schema', async () => {
    const onSubmit = jest.fn()
    const alertFunction = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(alertFunction)

    render(<AddWorkoutForm onSubmit={onSubmit} />)

    const numberField = screen.getByRole('spinbutton')
    userEvent.type(numberField, '11')
    await waitFor(() => {})

    const selectField = screen.getByRole('combobox')
    userEvent.selectOptions(selectField, 'run')
    await waitFor(() => {})

    const datePicker = screen.getByRole('date-picker')

    userEvent.clear(datePicker)
    await waitFor(() => {})

    userEvent.type(datePicker, '2020-12-30')
    await waitFor(() => {})

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(alertFunction).toHaveBeenCalledTimes(0)
    })
    expect(onSubmit).toHaveBeenCalledWith({
      duration: 11,
      kind: 'run',
      date: 1609286400000
    })
  })
})
