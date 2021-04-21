import { Story, Meta } from '@storybook/react/types-6-0'

import DateField, { DateFieldProps } from '.'

export default {
  title: 'Form/DateField',
  component: DateField
} as Meta

export const Default: Story<DateFieldProps> = (args) => <DateField {...args} />

Default.args = {
  label: 'Date Field'
}
