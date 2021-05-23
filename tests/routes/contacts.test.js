'use strict'

const express = require('express')

describe('contacts routes', () => {
  const mockRouter = { get: jest.fn() }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
  })

  it('should call get function for root path', () => {
    require('../../routes/contacts')
    const controller = require('../../controllers/contacts')
    expect(mockRouter.get.mock.calls.length).toBe(1)
    expect(mockRouter.get.mock.calls[0][0]).toBe('/')
    expect(mockRouter.get.mock.calls[0][1]).toBe(controller.listContacts)
  })

  it('should return router', () => {
    const actualRouter = require('../../routes/contacts')
    expect(actualRouter).toBe(mockRouter)
  })
})
