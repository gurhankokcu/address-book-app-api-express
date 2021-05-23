'use strict'

describe('models', () => {
  const mockSequelize = { key: 'value1' }
  const mockDataTypes = { key: 'value2' }
  const mockContact = { key: 'value3' }

  beforeEach(() => {
    jest.mock('sequelize', () => jest.fn().mockImplementation(() => {
      return mockSequelize
    }))
    jest.mock('../../models/contact', () => jest.fn().mockImplementation(() => {
      return mockContact
    }))

    require('sequelize').DataTypes = mockDataTypes
  })

  it('should create sequelize instance', () => {
    require('../../models')
    const sequelize = require('sequelize')
    expect(sequelize.mock.calls.length).toBe(1)
    expect(sequelize.mock.calls[0][0]).toBe('database.database')
    expect(sequelize.mock.calls[0][1]).toBe('database.username')
    expect(sequelize.mock.calls[0][2]).toBe('database.password')
    expect(sequelize.mock.calls[0][3]).toBe('database.options')
  })

  it('should create contact model', () => {
    require('../../models')
    const contact = require('../../models/contact')
    expect(contact.mock.calls.length).toBe(1)
    expect(contact.mock.calls[0][0]).toBe(mockSequelize)
    expect(contact.mock.calls[0][1]).toBe(mockDataTypes)
  })

  it('should return models', () => {
    const actualModels = require('../../models')
    const sequelize = require('sequelize')
    expect(actualModels.sequelize).toBe(mockSequelize)
    expect(actualModels.Sequelize).toBe(sequelize)
    expect(actualModels.Contact).toBe(mockContact)
  })
})
