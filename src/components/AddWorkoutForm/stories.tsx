import { Story, Meta } from '@storybook/react/types-6-0'
import AddWorkoutForm, { AddWorkoutFormProps } from '.'

export default {
  title: 'Form/AddWorkoutForm',
  component: AddWorkoutForm
} as Meta

export const Default: Story<AddWorkoutFormProps> = (args) => (
  <AddWorkoutForm {...args} />
)
