import { ExerciseProps } from 'components/WorkoutTable/TableData'

export const LOCAL_STORAGE_KEY = '@workout-log/workouts'

const save = (exercises: ExerciseProps[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exercises))
}

const getAll = () => {
  const items = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!items) return []

  return JSON.parse(items)
}

export default {
  save,
  getAll
}
