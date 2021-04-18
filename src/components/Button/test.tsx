import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Button from '.'

describe('<Button />', () => {
  it('should render the default button', async () => {
    render(<Button>Button Label</Button>)

    expect(
      screen.getByRole('button', { name: /button label/i })
    ).toBeInTheDocument()
  })

  it('should dispatch the onClick function when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Button Label</Button>)

    const button = screen.getByRole('button', { name: /button label/i })

    userEvent.click(button)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render the full width button', () => {
    render(<Button fullWidth>Button Label</Button>)

    expect(
      screen.getByRole('button', { name: /button label/i }).className
    ).toContain('w-full')
  })

  it('should render the minimal version', () => {
    render(<Button minimal>Button Label</Button>)

    expect(
      screen.getByRole('button', { name: /button label/i }).className
    ).toContain('bg-transparent')
  })

  it('should render with an icon', () => {
    render(
      <Button icon={<FontAwesomeIcon icon={faCheck} data-testid="icon" />}>
        Button Label
      </Button>
    )

    expect(
      screen.getByRole('button', { name: /button label/i })
    ).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render a disabled Button', () => {
    render(<Button disabled>Button Label</Button>)

    expect(
      screen.getByRole('button', { name: /button label/i }).className
    ).toContain('cursor-not-allowed')
  })

  it('should not dispatch the onClick function when disabled and clicked', async () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} disabled>
        Button Label
      </Button>
    )

    const button = screen.getByRole('button', { name: /button label/i })

    userEvent.click(button)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(0)
    })
  })
})
