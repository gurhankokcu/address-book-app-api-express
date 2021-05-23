'use strict'

const routes = require('../routes')

jest.mock('../routes')

describe('index', () => {
  const port = 1234
  const mockConfigGet = jest.fn().mockImplementation(() => port)
  const mockAppUse = jest.fn()
  const mockAppListen = jest.fn()

  beforeEach(() => {
    jest.mock('config', () => ({
      get: mockConfigGet
    }))
    jest.mock('express', () => jest.fn().mockImplementation(() => {
      return {
        use: mockAppUse,
        listen: mockAppListen
      }
    }))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should use routes', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(1)
    expect(mockAppUse.mock.calls[0][0]).toBe(routes)
  })

  it('should get port', () => {
    require('../index')
    expect(mockConfigGet.mock.calls.length).toBe(1)
    expect(mockConfigGet.mock.calls[0][0]).toBe('port')
  })

  it('should listen port', () => {
    require('../index')
    expect(mockAppListen.mock.calls.length).toBe(1)
    expect(mockAppListen.mock.calls[0][0]).toBe(port)
  })
})
