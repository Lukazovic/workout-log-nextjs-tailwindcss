import { render, RenderResult } from '@testing-library/react'

export const renderInTableBody = (children: React.ReactNode): RenderResult =>
  render(
    <table>
      <tbody>{children}</tbody>
    </table>
  )
