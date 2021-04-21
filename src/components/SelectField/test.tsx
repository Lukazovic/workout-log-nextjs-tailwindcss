import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SelectField, { SelectFieldProps } from '.'

import { options } from './mock'

const props: SelectFieldProps = {
  options,
  name: 'select name'
}

describe('<SelectField />', () => {
  it('should render correctly', () => {
    render(<SelectField {...props} />)

    expect(screen.getByRole('combobox')).toHaveAttribute('name', props.name)
  })

  it('should render with all options', () => {
    render(<SelectField {...props} />)

    options.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.label })
      ).toBeInTheDocument()
    })
  })

  it('should render with label', () => {
    render(<SelectField {...props} label="select label" />)

    expect(
      screen.getByRole('combobox', { name: /select label/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/select label/i)).toBeInTheDocument()
  })

  it('should render with initial value when passed', () => {
    render(
      <SelectField
        {...props}
        label="select label"
        initialValue={`${options[0].value}`}
      />
    )

    expect(screen.getByRole('combobox', { name: /select label/i })).toHaveValue(
      options[0].value
    )
  })

  it('should dispatch onChange function when option changes', async () => {
    const onChange = jest.fn()
    render(
      <SelectField
        {...props}
        label="select label"
        initialValue={`${options[0].value}`}
        onChange={onChange}
      />
    )

    // verify initial select value
    const selectFiled = screen.getByRole('combobox', { name: /select label/i })
    expect(selectFiled).toHaveValue(options[0].value)

    // select the first available option
    userEvent.selectOptions(selectFiled, 'value 1')

    // verify if it called the onChange function
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    // verify if the value has changed
    expect(selectFiled).toHaveValue(options[1].value)
  })

  it('should render disabled', async () => {
    const onChange = jest.fn()
    render(
      <SelectField
        {...props}
        label="select label"
        initialValue={`${options[0].value}`}
        onChange={onChange}
        disabled
      />
    )

    // verify initial select value
    const selectFiled = screen.getByRole('combobox', { name: /select label/i })
    expect(selectFiled).toHaveValue(options[0].value)

    // try to select the first available option
    userEvent.selectOptions(selectFiled, 'value 1')

    // verify if it did not called the onChange function
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(0)
    })

    // verify if the value hasn't changed
    expect(selectFiled).toHaveValue(options[0].value)
  })
})
