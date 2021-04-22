import React, { useState } from 'react'

import NumberField from 'components/NumberField'
import SelectField, { SelectOptionsProps } from 'components/SelectField'
import DateField from 'components/DateField'
import Button from 'components/Button'

import ValidationTools from 'services/tools/validation'
import GeneralTools from 'services/tools/general'

import DEFAULT_KIND_OPTIONS from 'utils/enums/options.json'

import { ExerciseProps } from 'components/WorkoutTable/TableData'

const KIND_OPTIONS: SelectOptionsProps[] = [
  { label: 'Select a exercise', value: 'nothing', disabled: true },
  ...DEFAULT_KIND_OPTIONS
]

export type AddWorkoutFormSchema = Omit<ExerciseProps, 'id'>

export type AddWorkoutFormProps = {
  className?: string
  onSubmit?: (Schema: AddWorkoutFormSchema) => void
}

const AddWorkoutForm = ({ className = '', onSubmit }: AddWorkoutFormProps) => {
  const [duration, setDuration] = useState<number>(0)
  const [kind, setKind] = useState<string>(KIND_OPTIONS[0].value as string)
  const [date, setDate] = useState<number>(new Date().getTime())

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration)
  }

  const handleKindChange = (newKind: string) => {
    setKind(newKind)
  }

  const handleDateChange = (newDate: string) => {
    const timestamp = new Date(newDate).getTime()
    setDate(timestamp)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!ValidationTools.isDurationValid(duration as number)) {
      alert('Selected duration is not valid!')
      return
    }

    if (!ValidationTools.isKindValid(kind)) {
      alert('Selected kind is not valid!')
      return
    }

    if (!ValidationTools.isDateValid(date as number)) {
      alert('Selected date is not valid!')
      return
    }

    const schema: AddWorkoutFormSchema = {
      duration: Number(duration),
      kind,
      date: GeneralTools.dateToUtcTimestamp(Number(date))
    }

    !!onSubmit && onSubmit(schema)
  }

  return (
    <form
      className={className.trim()}
      onSubmit={handleSubmit}
      aria-label="create new workout"
    >
      <fieldset className="border-2 border-black py-6 px-4">
        <legend>Insert an item</legend>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          <NumberField
            placeholder="Time spent"
            name="duration"
            value={duration}
            min={0}
            onChange={handleDurationChange}
          />
          <SelectField
            options={[...KIND_OPTIONS]}
            name="type"
            value={kind}
            initialValue={KIND_OPTIONS[0].value as string}
            onChange={handleKindChange}
          />

          <DateField
            name="date"
            initialValue={new Date().toISOString()}
            value={date}
            onChange={handleDateChange}
          />
          <Button type="submit">Add</Button>
        </div>
      </fieldset>
    </form>
  )
}

export default AddWorkoutForm
