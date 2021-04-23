import { useEffect, useState } from 'react'

import Heading from 'components/Heading'
import Logo from 'components/Logo'
import AddWorkoutForm from 'components/AddWorkoutForm'
import Divider from 'components/Divider'
import WorkoutTable from 'components/WorkoutTable'

import WorkoutResources from 'services/resources/workout'

import GeneralTools from 'services/tools/general'

import { ExerciseProps } from 'components/WorkoutTable/TableData'

const Home = () => {
  const [exercises, setExercises] = useState<ExerciseProps[]>([])

  const exercisesTotalDuration = GeneralTools.totalDuration(exercises)

  const handleRemoveItem = (itemId: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== itemId
    )

    WorkoutResources.save(updatedExercises)
    setExercises(updatedExercises)
  }

  const handleSubmit = (exercise: Omit<ExerciseProps, 'id'>) => {
    const updatedExercises = [
      ...exercises,
      { ...exercise, id: new Date().getTime().toString() }
    ]

    WorkoutResources.save(updatedExercises)
    setExercises(updatedExercises)
  }

  useEffect(() => {
    const savedExercises = WorkoutResources.getAll()
    setExercises(savedExercises)
  }, [])

  return (
    <main className="w-11/12 max-w-screen-lg h-full max-h-screen mx-auto py-8">
      <header className="mb-8 flex items-center justify-center">
        <Logo className="w-24 mr-4" />

        <Heading className="text-center text-5xl" level="h1">
          Workout Log
        </Heading>
      </header>

      <section id="add-workout-form">
        <AddWorkoutForm onSubmit={handleSubmit} />
      </section>

      <Divider className="my-8" />

      <section
        id="workout-list"
        className="border-2 border-black max-h-96 overflow-y-auto"
      >
        <WorkoutTable items={exercises} onRemoveItem={handleRemoveItem} />
      </section>

      <Heading className="text-center mt-8 text-2xl" level="h3">
        {exercisesTotalDuration} hours of exercises
      </Heading>
    </main>
  )
}

export default Home
