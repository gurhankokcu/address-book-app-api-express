'use strict'

describe('index', () => {
  const mockAppUse = jest.fn()
  const mockAppListen = jest.fn()
  const mockCors = { key: 'value1' }
  const mockJson = { key: 'value2' }
  const mockRoutes = { key: 'value3' }

  beforeEach(() => {
    jest.mock('express', () => jest.fn().mockImplementation(() => {
      return {
        use: mockAppUse,
        listen: mockAppListen
      }
    }))
    jest.mock('cors', () => () => mockCors)
    require('express').json = jest.fn().mockImplementation(() => mockJson)
    jest.mock('../routes', () => mockRoutes)
  })

  it('should use cors', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(3)
    expect(mockAppUse.mock.calls[0][0]).toBe(mockCors)
  })

  it('should use body parser', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(3)
    expect(mockAppUse.mock.calls[1][0]).toBe(mockJson)
  })

  it('should use routes', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(3)
    expect(mockAppUse.mock.calls[2][0]).toBe(mockRoutes)
  })

  it('should listen port', () => {
    require('../index')
    expect(mockAppListen.mock.calls.length).toBe(1)
    expect(mockAppListen.mock.calls[0][0]).toBe('port')
  })
})
