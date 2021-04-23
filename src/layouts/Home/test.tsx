import 'local-storage-mock'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import HomeLayout from '.'

import WorkoutResources from 'services/resources/workout'

describe('<HomeLayout />', () => {
  it('should render with logo and title', () => {
    render(<HomeLayout />)

    expect(
      screen.getByRole('heading', { level: 1, name: /workout log/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /workout log/i })
    ).toBeInTheDocument()
  })

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

  describe('when add 1 item with 3 hours duration', () => {
    describe('on remove items', () => {
      it('should show an empty list', async () => {
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

        expect(screen.getByText(/3 hours of exercises/i)).toBeInTheDocument()
        expect(
          screen.queryByRole('heading', {
            level: 4,
            name: /no exercises yet!/i
          })
        ).not.toBeInTheDocument()

        const deleteFirstItemButton = screen.getByRole('button', {
          name: /delete item/i
        })
        userEvent.click(deleteFirstItemButton)

        expect(
          screen.getByRole('heading', { level: 4, name: /no exercises yet!/i })
        ).toBeInTheDocument()
        expect(screen.getByText(/0 hours of exercises/i)).toBeInTheDocument()
      })
    })
  })

  describe('saved items', () => {
    describe('on component mount', () => {
      it('should call WorkoutResources.getAll', () => {
        WorkoutResources.getAll = jest.fn(() => [])
        render(<HomeLayout />)

        expect(WorkoutResources.getAll).toHaveBeenCalledTimes(1)
      })
    })

    describe('when there are items save', () => {
      it('should fetch items and show on the screen', async () => {
        const items = [{ id: '1', duration: 1, kind: 'run', date: 123 }]
        WorkoutResources.getAll = jest.fn(() => items)

        render(<HomeLayout />)

        expect(
          screen.getByText(`${items[0].duration} hours of exercises`)
        ).toBeInTheDocument()
      })
    })

    describe('on added new item', () => {
      it('should call WorkoutResources.save with correct item', async () => {
        WorkoutResources.save = jest.fn()
        render(<HomeLayout />)

        const durationField = screen.getByRole('spinbutton')
        userEvent.type(durationField, '11')

        const selectField = screen.getByRole('combobox')
        userEvent.selectOptions(selectField, 'run')

        const datePicker = screen.getByRole('date-picker')
        userEvent.clear(datePicker)
        userEvent.type(datePicker, '2020-12-30')

        const submitButton = screen.getByRole('button', { name: /add/i })
        userEvent.click(submitButton)
        await waitFor(() => {
          expect(WorkoutResources.save).toBeCalledTimes(1)
        })
        expect(WorkoutResources.save).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              duration: 11,
              kind: 'run',
              date: expect.any(Number)
            })
          ])
        )
      })
    })
  })
})
