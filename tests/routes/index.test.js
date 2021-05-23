'use strict'

const express = require('express')

describe('routes', () => {
  const mockRouter = { use: jest.fn() }
  const mockMainRouter = { key: 'value1' }
  const mockContactsRouter = { key: 'value1' }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
    jest.mock('../../routes/main', () => mockMainRouter)
    jest.mock('../../routes/contacts', () => mockContactsRouter)
  })

  it('should use 2 routers', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls.length).toBe(2)
  })

  it('should use main router', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls[0][0]).toBe('/')
    expect(mockRouter.use.mock.calls[0][1]).toBe(mockMainRouter)
  })

  it('should use contacts router', () => {
    require('../../routes')
    expect(mockRouter.use.mock.calls[1][0]).toBe('/contacts')
    expect(mockRouter.use.mock.calls[1][1]).toBe(mockContactsRouter)
  })
})
