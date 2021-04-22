import { ExerciseProps } from 'components/WorkoutTable/TableData'

const ONE_MINUTE_IN_SECONDS = 60
const ONE_SECOND_IN_MILLISECOND = 1000

const minutesToMilliseconds = (minutes: number) =>
  minutes * ONE_MINUTE_IN_SECONDS * ONE_SECOND_IN_MILLISECOND

const dateToUtcTimestamp = (timestamp: number) => {
  const currentTimezoneInMinutes = new Date().getTimezoneOffset()

  return timestamp + minutesToMilliseconds(currentTimezoneInMinutes)
}

const isOdd = (number: number) => number % 2

const totalDuration = (exercises: ExerciseProps[]) =>
  exercises.reduce(
    (accumulator, exercise) => accumulator + exercise.duration,
    0
  )

export default {
  minutesToMilliseconds,
  dateToUtcTimestamp,
  isOdd,
  totalDuration
}
