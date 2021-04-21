import { Story, Meta } from '@storybook/react/types-6-0'

import NumberField, { NumberFieldProps } from '.'

export default {
  title: 'Form/NumberField',
  component: NumberField
} as Meta

export const Default: Story<NumberFieldProps> = (args) => (
  <NumberField {...args} />
)

Default.args = {
  label: 'Number Field'
}
