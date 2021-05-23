'use strict'

const express = require('express')
const controller = require('../../controllers/contacts')

describe('contacts routes', () => {
  const mockRouter = { get: jest.fn() }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call get function for root path', () => {
    require('../../routes/contacts')
    expect(mockRouter.get.mock.calls.length).toBe(1)
    expect(mockRouter.get.mock.calls[0][0]).toBe('/')
    expect(mockRouter.get.mock.calls[0][1]).toBe(controller.getContacts)
  })

  it('should return router', () => {
    const actualRouter = require('../../routes/contacts')
    expect(actualRouter).toBe(mockRouter)
  })
})
