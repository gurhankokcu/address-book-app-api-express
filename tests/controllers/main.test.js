'use strict'

const controller = require('../../controllers/main')

describe('main controller', () => {
  it('should call send function', () => {
    const mockRes = { send: jest.fn() }
    controller.getMain(null, mockRes)
    expect(mockRes.send.mock.calls.length).toBe(1)
    expect(mockRes.send.mock.calls[0][0]).toBe('It works!')
  })
})
