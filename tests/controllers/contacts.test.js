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
        findAll: () => {}
      }
    }
    const mockReq = { query: {} }
    const mockRes = { json: () => {} }

    beforeEach(() => {
      jest.mock('config', () => ({
        get: jest.fn().mockImplementation((key) => key === 'pagesize' ? 5 : 99)
      }))
      jest.mock('../../models', () => mockModels)
      jest.spyOn(mockModels.Contact, 'findAll').mockImplementation(() => contactsData)
      mockReq.query = {}
      jest.spyOn(mockRes, 'json')
    })

    it('should return all contacts', async () => {
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toBe(contactsData)
    })

    it('should return 1st page if page is not specified', async () => {
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(0)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
    })

    it('should return error if page is not a positive number', async () => {
      mockReq.query.page = -5
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('page')
    })

    it('should return error if page is not a number', async () => {
      mockReq.query.page = 'text'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('page')
    })

    it('should return 1st page', async () => {
      mockReq.query.page = 1
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(0)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
    })

    it('should return 2nd page', async () => {
      mockReq.query.page = 2
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(5)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
    })

    it('should return 3rd page', async () => {
      mockReq.query.page = '3'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(10)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
    })

    it('should return error if name query contains non alphanumeric character', async () => {
      mockReq.query.name = 'na"me'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should query by name', async () => {
      const Op = require('sequelize').Op
      mockReq.query.name = 'name'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].where).toEqual({
        [Op.and]: [{ name: { [Op.like]: '%name%' } }]
      })
    })

    it('should return error if phone query contains non numeric character', async () => {
      mockReq.query.phone = '32a'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should query by phone', async () => {
      const Op = require('sequelize').Op
      mockReq.query.phone = '321'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].where).toEqual({
        [Op.and]: [{ phone: { [Op.like]: '%321%' } }]
      })
    })

    it('should return error if email query contains non alphanumeric character', async () => {
      mockReq.query.email = 'ema"il'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('email')
    })

    it('should query by email', async () => {
      const Op = require('sequelize').Op
      mockReq.query.email = 'email'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].where).toEqual({
        [Op.and]: [{ email: { [Op.like]: '%email%' } }]
      })
    })

    it('should use and operator', async () => {
      const Op = require('sequelize').Op
      mockReq.query.operator = 'and'
      mockReq.query.name = 'name'
      mockReq.query.phone = '321'
      mockReq.query.email = 'email'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].where).toEqual({
        [Op.and]: [
          { name: { [Op.like]: '%name%' } },
          { phone: { [Op.like]: '%321%' } },
          { email: { [Op.like]: '%email%' } }
        ]
      })
    })

    it('should use or operator', async () => {
      const Op = require('sequelize').Op
      mockReq.query.operator = 'or'
      mockReq.query.name = 'name'
      mockReq.query.phone = '321'
      mockReq.query.email = 'email'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].where).toEqual({
        [Op.or]: [
          { name: { [Op.like]: '%name%' } },
          { phone: { [Op.like]: '%321%' } },
          { email: { [Op.like]: '%email%' } }
        ]
      })
    })
  })
})
