import { Story, Meta } from '@storybook/react/types-6-0'

import SelectField, { SelectFieldProps } from '.'

import { options } from './mock'

export default {
  title: 'SelectField',
  component: SelectField,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta

export const Default: Story<SelectFieldProps> = (args) => (
  <SelectField {...args} options={options} initialValue="no value" />
)

Default.args = {
  label: 'Label'
}
