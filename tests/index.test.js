'use strict'

describe('index', () => {
  const mockAppUse = jest.fn()
  const mockAppListen = jest.fn()
  const mockJson = { key: 'value1' }
  const mockRoutes = { key: 'value2' }

  beforeEach(() => {
    jest.mock('express', () => jest.fn().mockImplementation(() => {
      return {
        use: mockAppUse,
        listen: mockAppListen
      }
    }))
    require('express').json = jest.fn().mockImplementation(() => mockJson)
    jest.mock('../routes', () => mockRoutes)
  })

  it('should use body parser', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(2)
    expect(mockAppUse.mock.calls[0][0]).toBe(mockJson)
  })

  it('should use routes', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(2)
    expect(mockAppUse.mock.calls[1][0]).toBe(mockRoutes)
  })

  it('should listen port', () => {
    require('../index')
    expect(mockAppListen.mock.calls.length).toBe(1)
    expect(mockAppListen.mock.calls[0][0]).toBe('port')
  })
})
