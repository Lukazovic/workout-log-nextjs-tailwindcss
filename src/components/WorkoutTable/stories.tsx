import { Story, Meta } from '@storybook/react/types-6-0'
import WorkoutTable from '.'

export default {
  title: 'WorkoutTable',
  component: WorkoutTable
} as Meta

export const Default: Story = () => <WorkoutTable />
