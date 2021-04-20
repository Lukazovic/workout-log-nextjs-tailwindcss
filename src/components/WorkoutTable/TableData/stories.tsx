import { Story, Meta } from '@storybook/react/types-6-0'

import TableData, { TableDataProps } from '.'
import { items } from './mock'

import GeneralTools from 'services/tools/general'

export default {
  title: 'WorkoutTable/TableData',
  component: TableData
} as Meta

export const Default: Story<TableDataProps> = (args) => (
  <>
    {items.map((item, index) => (
      <TableData
        {...args}
        key={item.id}
        id={item.id}
        duration={item.duration}
        type={item.type}
        date={item.date}
        variant={GeneralTools.isOdd(index) ? 'light' : 'dark'}
      />
    ))}
  </>
)
