'use strict'

describe('index', () => {
  const mockAppUse = jest.fn()
  const mockAppListen = jest.fn()
  const mockRoutes = { key: 'value' }

  beforeEach(() => {
    jest.mock('express', () => jest.fn().mockImplementation(() => {
      return {
        use: mockAppUse,
        listen: mockAppListen
      }
    }))
    jest.mock('../routes', () => mockRoutes)
  })

  it('should use routes', () => {
    require('../index')
    expect(mockAppUse.mock.calls.length).toBe(1)
    expect(mockAppUse.mock.calls[0][0]).toBe(mockRoutes)
  })

  it('should listen port', () => {
    require('../index')
    expect(mockAppListen.mock.calls.length).toBe(1)
    expect(mockAppListen.mock.calls[0][0]).toBe('port')
  })
})
