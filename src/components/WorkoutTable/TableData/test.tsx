import { render, screen, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TableData, { TableDataProps } from '.'

const props: TableDataProps = {
  id: '1',
  duration: 5,
  type: 'bike',
  date: 1618891669586
}

export const renderInTableBody = (children: React.ReactNode): RenderResult =>
  render(
    <table>
      <tbody>{children}</tbody>
    </table>
  )

describe('<TableData />', () => {
  it('should render correctly', () => {
    renderInTableBody(<TableData {...props} />)

    // duration
    expect(screen.getByText(`${props.duration}h`)).toBeInTheDocument()

    // type
    expect(screen.getByText(`${props.type}`)).toBeInTheDocument()

    // formatted date
    expect(screen.getByText('20/04/2021')).toBeInTheDocument()

    // delete button
    expect(
      screen.getByRole('button', { name: /delete item/i })
    ).toBeInTheDocument()
  })

  it('should render with light background by default', () => {
    const { container } = renderInTableBody(<TableData {...props} />)

    expect(container.querySelector('tr')).toHaveClass('bg-white')
  })

  it('should render with dark background', () => {
    const { container } = renderInTableBody(
      <TableData {...props} variant="dark" />
    )

    expect(container.querySelector('tr')).toHaveClass('bg-gray-300')
  })

  it('should dispatch onRemove when delete icon is clicked', async () => {
    const onRemove = jest.fn()
    renderInTableBody(<TableData {...props} onRemove={onRemove} />)

    const deleteButton = screen.getByRole('button', { name: /delete item/i })

    userEvent.click(deleteButton)
    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledTimes(1)
    })
    expect(onRemove).toHaveBeenCalledWith(props.id)
  })
})
