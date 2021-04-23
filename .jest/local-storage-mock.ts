jest.spyOn(window.localStorage.__proto__, 'setItem')
window.localStorage.__proto__.setItem = jest.fn()

jest.spyOn(window.localStorage.__proto__, 'getItem')
window.localStorage.__proto__.getItem = jest.fn()
