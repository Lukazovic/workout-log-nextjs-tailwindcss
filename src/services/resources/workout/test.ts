import WorkoutResources, { LOCAL_STORAGE_KEY } from '.'

import { ExerciseProps } from 'components/WorkoutTable/TableData'

describe('WorkoutResources', () => {
  describe('#save', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'setItem')
      window.localStorage.__proto__.setItem = jest.fn()
    })

    it('should call localStorage.setItem with the correct key', () => {
      const items: ExerciseProps[] = []
      WorkoutResources.save(items)

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        JSON.stringify(items)
      )
    })

    describe('with an empty array', () => {
      it('should call localStorage.setItem with an empty array', () => {
        const items: ExerciseProps[] = []
        WorkoutResources.save(items)

        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
          LOCAL_STORAGE_KEY,
          JSON.stringify(items)
        )
      })
    })

    describe('with not empty array', () => {
      it('should call localStorage.setItem with all items', () => {
        const items: ExerciseProps[] = [
          { id: '1', duration: 1, kind: 'run', date: 123 },
          { id: '2', duration: 3, kind: 'bike', date: 321 },
          { id: '3', duration: 2, kind: 'swimming', date: 333 }
        ]
        WorkoutResources.save(items)

        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
          LOCAL_STORAGE_KEY,
          JSON.stringify(items)
        )
      })
    })
  })

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'getItem')
      window.localStorage.__proto__.getItem = jest.fn()
    })

    it('should call localStorage.getItem with the correct key', () => {
      WorkoutResources.getAll()

      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY)
    })

    describe('when there is no item in the localStorage', () => {
      it('should return an empty array', () => {
        const result = WorkoutResources.getAll()
        expect(result).toHaveLength(0)
      })
    })

    describe('when there are 3 items in the localStorage', () => {
      let items: ExerciseProps[]

      beforeEach(() => {
        items = [
          { id: '1', duration: 1, kind: 'run', date: 123 },
          { id: '2', duration: 3, kind: 'bike', date: 321 },
          { id: '3', duration: 2, kind: 'swimming', date: 333 }
        ]

        window.localStorage.__proto__.getItem = () => JSON.stringify(items)
      })

      it('should not return an empty array', () => {
        const result = WorkoutResources.getAll()

        expect(result).not.toHaveLength(0)
      })

      it('should return the correct items', () => {
        const result = WorkoutResources.getAll()

        expect(result).toEqual(items)
        expect(result).toHaveLength(items.length)
      })
    })
  })
})
