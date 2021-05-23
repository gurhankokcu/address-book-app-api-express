'use strict'

describe('contacts controller', () => {
  describe('list contacts', () => {
    const contactsData = [{
      id: 1,
      name: 'Name 1'
    }, {
      id: 2,
      name: 'Name 2'
    }]
    const mockModels = {
      Contact: {
        findAll: jest.fn().mockImplementation(() => contactsData)
      }
    }

    beforeEach(() => {
      jest.mock('../../models', () => mockModels)
    })

    it('should return all contacts', async () => {
      const controller = require('../../controllers/contacts')
      const mockRes = { json: jest.fn() }
      await controller.listContacts(null, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toBe(contactsData)
    })
  })
})
