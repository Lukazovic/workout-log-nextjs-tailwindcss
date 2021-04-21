import KIND_OPTIONS from 'utils/enums/options.json'

const isDurationValid = (duration: number) => duration > 0

const isKindValid = (kind: string) =>
  KIND_OPTIONS.some((option) => option.value === kind)

const isDateValid = (date: number) => date > 0 && date <= new Date().getTime()

export default {
  isDurationValid,
  isKindValid,
  isDateValid
}
