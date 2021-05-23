'use strict'

beforeEach(() => {
  jest.mock('config', () => ({
    get: jest.fn().mockImplementation((key) => key)
  }))
  jest.mock('sequelize')
})

afterEach(() => {
  jest.restoreAllMocks()
})
