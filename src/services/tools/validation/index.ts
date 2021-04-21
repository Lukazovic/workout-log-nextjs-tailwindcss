import KIND_OPTIONS from 'utils/enums/options.json'

const isTimeValid = (time: number) => time > 0

const isKindValid = (kind: string) =>
  KIND_OPTIONS.some((option) => option.value === kind)

const isDateValid = (date: number) => date > 0 && date <= new Date().getTime()

export default {
  isTimeValid,
  isKindValid,
  isDateValid
}
