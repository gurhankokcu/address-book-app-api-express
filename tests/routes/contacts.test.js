'use strict'

const express = require('express')

describe('contacts routes', () => {
  const mockRouter = {
    get: jest.fn(),
    post: jest.fn()
  }

  beforeEach(() => {
    jest.spyOn(express, 'Router').mockImplementation(() => mockRouter)
  })

  it('should create get method for root path', () => {
    require('../../routes/contacts')
    const controller = require('../../controllers/contacts')
    expect(mockRouter.get.mock.calls.length).toBe(1)
    expect(mockRouter.get.mock.calls[0][0]).toBe('/')
    expect(mockRouter.get.mock.calls[0][1]).toBe(controller.listContacts)
  })

  it('should create post method for root path to create contacts', () => {
    require('../../routes/contacts')
    const controller = require('../../controllers/contacts')
    expect(mockRouter.post.mock.calls.length).toBe(1)
    expect(mockRouter.post.mock.calls[0][0]).toBe('/')
    expect(mockRouter.post.mock.calls[0][1]).toBe(controller.addContact)
  })

  it('should return router', () => {
    const actualRouter = require('../../routes/contacts')
    expect(actualRouter).toBe(mockRouter)
  })
})
