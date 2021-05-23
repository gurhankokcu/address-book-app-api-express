'use strict'

const express = require('express')
const controller = require('../../controllers/main')

describe('main routes', () => {
  const mockRouter = { get: jest.fn() }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
  })

  it('should call get function for root path', () => {
    require('../../routes/main')
    expect(mockRouter.get.mock.calls.length).toBe(1)
    expect(mockRouter.get.mock.calls[0][0]).toBe('/')
    expect(mockRouter.get.mock.calls[0][1]).toBe(controller.getMain)
  })

  it('should return router', () => {
    const actualRouter = require('../../routes/main')
    expect(actualRouter).toBe(mockRouter)
  })
})
