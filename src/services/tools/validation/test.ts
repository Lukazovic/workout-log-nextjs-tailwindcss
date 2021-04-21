import ValidationTools from '.'

import KIND_OPTIONS from 'utils/enums/options.json'

describe('ValidationTools', () => {
  describe('#isDurationValid', () => {
    describe('duration is less than 0', () => {
      it('should return false', () => {
        expect(ValidationTools.isDurationValid(-1)).toBeFalsy()
        expect(ValidationTools.isDurationValid(-5)).toBeFalsy()
        expect(ValidationTools.isDurationValid(-10)).toBeFalsy()
      })
    })

    describe('duration is equal to 0', () => {
      it('should return false', () => {
        expect(ValidationTools.isDurationValid(0)).toBeFalsy()
      })
    })

    describe('duration is greater than 0', () => {
      it('should return true', () => {
        expect(ValidationTools.isDurationValid(1)).toBeTruthy()
        expect(ValidationTools.isDurationValid(5)).toBeTruthy()
        expect(ValidationTools.isDurationValid(10)).toBeTruthy()
      })
    })
  })

  describe('#isKindValid', () => {
    describe('kind is not a valid option', () => {
      it('should return false', () => {
        expect(ValidationTools.isKindValid('nothing')).toBeFalsy()
        expect(ValidationTools.isKindValid('0000')).toBeFalsy()
        expect(ValidationTools.isKindValid('hello world')).toBeFalsy()
      })
    })

    describe('kind is a valid option', () => {
      it('should return true', () => {
        expect(ValidationTools.isKindValid(KIND_OPTIONS[0].value)).toBeTruthy()
        expect(ValidationTools.isKindValid(KIND_OPTIONS[1].value)).toBeTruthy()
        expect(ValidationTools.isKindValid(KIND_OPTIONS[2].value)).toBeTruthy()
      })
    })
  })

  describe('#isDateValid', () => {
    describe('when date is a negative number', () => {
      it('should return false', () => {
        expect(ValidationTools.isDateValid(-1)).toBeFalsy()
        expect(ValidationTools.isDateValid(-5)).toBeFalsy()
        expect(ValidationTools.isDateValid(-10)).toBeFalsy()
      })
    })

    describe('when date is 0', () => {
      it('should return false', () => {
        expect(ValidationTools.isDateValid(0)).toBeFalsy()
      })
    })

    describe('when date is a positive number', () => {
      describe('when date greater than the current time', () => {
        it('should return false', () => {
          const currentTime = new Date().getTime()
          expect(ValidationTools.isDateValid(currentTime + 999)).toBeFalsy()
        })
      })

      describe('when date is equal to the current time', () => {
        it('should return false', () => {
          const currentTime = new Date().getTime()
          expect(ValidationTools.isDateValid(currentTime)).toBeTruthy()
        })
      })

      describe('when date less than the current time', () => {
        it('should return false', () => {
          const currentTime = new Date().getTime()
          expect(ValidationTools.isDateValid(currentTime - 999)).toBeTruthy()
        })
      })
    })
  })
})
