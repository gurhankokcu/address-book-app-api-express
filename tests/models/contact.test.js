'use strict'

const model = require('../../models/contact')

describe('contact model', () => {
  it('should define contact', () => {
    const mockSequelize = { define: jest.fn() }
    model(mockSequelize, {})
    expect(mockSequelize.define.mock.calls.length).toBe(1)
    expect(mockSequelize.define.mock.calls[0][0]).toBe('Contact')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('name')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('company')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('address')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('phone')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('email')
    expect(mockSequelize.define.mock.calls[0][1]).toHaveProperty('notes')
  })

  it('should specify table name', () => {
    const mockSequelize = { define: jest.fn() }
    model(mockSequelize, {})
    expect(mockSequelize.define.mock.calls[0][2].tableName).toBe('contact')
  })
})
