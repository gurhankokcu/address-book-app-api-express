'use strict'

describe('contacts controller', () => {
  const mockModels = {
    Contact: {
      findAll: () => {},
      create: () => {}
    }
  }
  const mockRes = { json: () => {} }

  beforeEach(() => {
    jest.mock('../../models', () => mockModels)
    jest.spyOn(mockRes, 'json')
  })

  describe('list contacts', () => {
    const contactsData = [{
      id: 1,
      name: 'Name 1'
    }, {
      id: 2,
      name: 'Name 2'
    }]
    const mockReq = { query: {} }

    beforeEach(() => {
      jest.mock('config', () => ({
        get: jest.fn().mockImplementation((key) => key === 'pagesize' ? 5 : 99)
      }))
      jest.spyOn(mockModels.Contact, 'findAll').mockImplementation(() => contactsData)
      mockReq.query = {}
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

  describe('add contact', () => {
    const contactData = {
      name: 'Hollie Graham',
      company: 'Turner, Fox and Jones',
      address: 'Studio 54 Rogers Mills West Abigailton CH64 3TH',
      phone: '+44(0)2467 427810',
      email: 'hollie_graham@gmail.com',
      notes: 'Real estate agent, Flat 84 King Plains'
    }
    const mockReq = { body: {} }

    beforeEach(() => {
      jest.spyOn(mockModels.Contact, 'create').mockImplementation(() => ({ ...contactData, createdAt: 'createdAt' }))
      mockReq.body = {}
    })

    it('should return error if body is undefined', async () => {
      delete mockReq.body
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if body is empty', async () => {
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if name is not given', async () => {
      mockReq.body = { ...contactData }
      delete mockReq.body.name
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if name is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.name = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if company is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.company = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('company')
    })

    it('should return error if address is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.address = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('address')
    })

    it('should return error if phone is not given', async () => {
      mockReq.body = { ...contactData }
      delete mockReq.body.phone
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should return error if phone is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.phone = 'text'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should return error if email is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.email = 'text'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('email')
    })

    it('should return error if notes is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.notes = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('notes')
    })

    it('should save contact when only name and phone given', async () => {
      mockReq.body = {
        name: contactData.name,
        phone: contactData.phone
      }
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockModels.Contact.create.mock.calls.length).toBe(1)
      expect(mockModels.Contact.create.mock.calls[0][0]).toEqual(mockReq.body)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('name')
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('phone')
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('createdAt')
    })

    it('should save contact', async () => {
      mockReq.body = { ...contactData }
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockModels.Contact.create.mock.calls.length).toBe(1)
      expect(mockModels.Contact.create.mock.calls[0][0]).toEqual(mockReq.body)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toEqual({
        ...mockReq.body,
        createdAt: 'createdAt'
      })
    })
  })
})
