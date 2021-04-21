import { Story, Meta } from '@storybook/react/types-6-0'

import WorkoutTable, { WorkoutTableProps } from '.'

import { items } from './TableData/mock'

export default {
  title: 'WorkoutTable',
  component: WorkoutTable
} as Meta

export const Default: Story<WorkoutTableProps> = (args) => (
  <WorkoutTable {...args} items={[...items]} />
)

export const Empty: Story<WorkoutTableProps> = (args) => (
  <WorkoutTable {...args} />
)
