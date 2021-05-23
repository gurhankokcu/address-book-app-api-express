'use strict'

const express = require('express')
const mainRouter = require('../../routes/main')
const contactsRouter = require('../../routes/contacts')

describe('routes', () => {
  const mockRouter = { use: jest.fn() }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should use 2 routers', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls.length).toBe(2)
  })

  it('should use main router', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls[0][0]).toBe('/')
    expect(mockRouter.use.mock.calls[0][1]).toBe(mainRouter)
  })

  it('should use contacts router', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls[1][0]).toBe('/contacts')
    expect(mockRouter.use.mock.calls[1][1]).toBe(contactsRouter)
  })
})
