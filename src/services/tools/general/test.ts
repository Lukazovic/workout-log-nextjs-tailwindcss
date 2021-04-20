import GeneralTools from '.'

describe('GeneralTools', () => {
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
})
