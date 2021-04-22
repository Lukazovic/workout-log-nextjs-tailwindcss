import GeneralTools from '.'

import { ExerciseProps } from 'components/WorkoutTable/TableData'

describe('GeneralTools', () => {
  describe('#minutesToMilliseconds', () => {
    describe('with 1 minute', () => {
      it('should return 60000', () => {
        expect(GeneralTools.minutesToMilliseconds(1)).toBe(60000)
      })
    })

    describe('with 180 minute', () => {
      it('should return 10800000', () => {
        expect(GeneralTools.minutesToMilliseconds(180)).toBe(10800000)
      })
    })

    describe('with 0 minutes', () => {
      it('should return 0', () => {
        expect(GeneralTools.minutesToMilliseconds(0)).toBe(0)
      })
    })

    describe('with -1 minutes', () => {
      it('should return -60000', () => {
        expect(GeneralTools.minutesToMilliseconds(-1)).toBe(-60000)
      })
    })
  })

  describe('#dateToUtcTimestamp', () => {
    describe('with timestamp 1618444800000', () => {
      const timestamp = 1618444800000
      const currentTimezoneInMinutes = new Date().getTimezoneOffset()
      const currentTimezoneInMilliseconds = GeneralTools.minutesToMilliseconds(
        currentTimezoneInMinutes
      )

      const expectedValue = timestamp + currentTimezoneInMilliseconds
      it(`should return ${expectedValue}`, () => {
        expect(GeneralTools.dateToUtcTimestamp(1618444800000)).toBe(
          expectedValue
        )
      })
    })
  })

  describe('#isOdd', () => {
    describe('when number is odd', () => {
      it('should return true', () => {
        expect(GeneralTools.isOdd(1)).toBeTruthy()
        expect(GeneralTools.isOdd(3)).toBeTruthy()
        expect(GeneralTools.isOdd(-1)).toBeTruthy()
      })
    })

    describe('when number is even', () => {
      it('should return false', () => {
        expect(GeneralTools.isOdd(0)).toBeFalsy()
        expect(GeneralTools.isOdd(2)).toBeFalsy()
        expect(GeneralTools.isOdd(4)).toBeFalsy()
      })
    })
  })

  describe('#totalDuration', () => {
    describe('when list has 1 exercise', () => {
      describe('with duration equal to 0', () => {
        it('should return 0', () => {
          const exercises: ExerciseProps[] = [
            { id: '1', kind: 'something', date: 123, duration: 0 }
          ]

          expect(GeneralTools.totalDuration(exercises)).toBe(0)
        })
      })

      describe('with duration equal to 1', () => {
        it('should return 1', () => {
          const exercises: ExerciseProps[] = [
            { id: '1', kind: 'something', date: 123, duration: 1 }
          ]

          expect(GeneralTools.totalDuration(exercises)).toBe(1)
        })
      })

      describe('with duration equal to 777', () => {
        it('should return 777', () => {
          const exercises: ExerciseProps[] = [
            { id: '1', kind: 'something', date: 123, duration: 777 }
          ]

          expect(GeneralTools.totalDuration(exercises)).toBe(777)
        })
      })
    })

    describe('when list has 3 exercises', () => {
      describe('with duration equal to 2 each', () => {
        it('should return 6', () => {
          const exercises: ExerciseProps[] = [
            { id: '1', kind: 'something', date: 123, duration: 2 },
            { id: '2', kind: 'something', date: 123, duration: 2 },
            { id: '3', kind: 'something', date: 123, duration: 2 }
          ]

          expect(GeneralTools.totalDuration(exercises)).toBe(6)
        })
      })
    })
  })
})
