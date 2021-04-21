import DateTools from '.'

describe('DateTools', () => {
  describe('#formatDateToPtBrDate', () => {
    describe('when timestamp is 1618891669586', () => {
      it('should return 20/04/2021', () => {
        const timestamp = 1618891669586
        const result = DateTools.formatDateToPtBrDate(timestamp)

        expect(result).toBe('20/04/2021')
      })
    })
  })
})
