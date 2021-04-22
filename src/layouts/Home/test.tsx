import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import HomeLayout from '.'

describe('<HomeLayout />', () => {
  it('should render with AddWorkoutForm and WorkoutTable', () => {
    render(<HomeLayout />)

    expect(
      screen.getByRole('form', { name: /create new workout/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: /workout-list/i })
    ).toBeInTheDocument()
  })

  it('should render with no exercises by default', () => {
    render(<HomeLayout />)

    expect(
      screen.getByRole('heading', { level: 4, name: /no exercises yet!/i })
    ).toBeInTheDocument()
  })

  it('should add a new item to the list', async () => {
    render(<HomeLayout />)

    const numberField = screen.getByRole('spinbutton')
    userEvent.type(numberField, '11')

    const selectField = screen.getByRole('combobox')
    userEvent.selectOptions(selectField, 'run')

    const datePicker = screen.getByRole('date-picker')
    userEvent.clear(datePicker)
    userEvent.type(datePicker, '2020-12-30')

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)

    expect(
      screen.queryByRole('heading', { level: 4, name: /no exercises yet!/i })
    ).not.toBeInTheDocument()
  })

  it('should show the correct item when added', async () => {
    render(<HomeLayout />)

    const numberField = screen.getByRole('spinbutton')
    userEvent.type(numberField, '11')

    const selectField = screen.getByRole('combobox')
    userEvent.selectOptions(selectField, 'run')

    const datePicker = screen.getByRole('date-picker')
    userEvent.clear(datePicker)
    userEvent.type(datePicker, '2020-12-30')

    const submitButton = screen.getByRole('button', { name: /add/i })
    userEvent.click(submitButton)

    expect(screen.getByText('11h')).toBeInTheDocument()
    expect(screen.getByText('run')).toBeInTheDocument()
    expect(screen.getByText('30/12/2020')).toBeInTheDocument()
  })

  describe('when add 1 item with 2 hours duration', () => {
    it('should show the "2 hours of exercises"', async () => {
      render(<HomeLayout />)

      const numberField = screen.getByRole('spinbutton')
      userEvent.type(numberField, '2')

      const selectField = screen.getByRole('combobox')
      userEvent.selectOptions(selectField, 'run')

      const datePicker = screen.getByRole('date-picker')
      userEvent.clear(datePicker)
      userEvent.type(datePicker, '2020-12-30')

      const submitButton = screen.getByRole('button', { name: /add/i })
      userEvent.click(submitButton)

      expect(screen.getByText(/2 hours of exercises/i)).toBeInTheDocument()
    })
  })

  describe('when add 2 item with 3 hours duration each', () => {
    it('should show the "6 hours of exercises"', async () => {
      render(<HomeLayout />)

      const numberField = screen.getByRole('spinbutton')
      const selectField = screen.getByRole('combobox')
      const datePicker = screen.getByRole('date-picker')
      const submitButton = screen.getByRole('button', { name: /add/i })

      userEvent.type(numberField, '3')
      userEvent.selectOptions(selectField, 'run')
      userEvent.clear(datePicker)
      userEvent.type(datePicker, '2020-12-30')
      userEvent.click(submitButton)

      userEvent.clear(numberField)
      userEvent.type(numberField, '3')
      userEvent.selectOptions(selectField, 'run')
      userEvent.clear(datePicker)
      userEvent.type(datePicker, '2020-12-30')
      userEvent.click(submitButton)

      expect(screen.getByText(/6 hours of exercises/i)).toBeInTheDocument()
    })
  })
})
