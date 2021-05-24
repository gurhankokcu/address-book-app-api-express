'use strict'

describe('contacts controller', () => {
  const mockModels = {
    Contact: {
      findAll: () => {},
      findByPk: () => {},
      create: () => {}
    }
  }
  const mockRes = { status: () => mockRes, json: () => mockRes }

  beforeEach(() => {
    jest.mock('../../models', () => mockModels)
    jest.spyOn(mockRes, 'status')
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toBe(contactsData)
    })

    it('should return 1st page if page is not specified', async () => {
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(0)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return error if page is not a positive number', async () => {
      mockReq.query.page = -5
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('page')
    })

    it('should return error if page is not a number', async () => {
      mockReq.query.page = 'text'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return 2nd page', async () => {
      mockReq.query.page = 2
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(5)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return 3rd page', async () => {
      mockReq.query.page = '3'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockModels.Contact.findAll.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findAll.mock.calls[0][0].offset).toBe(10)
      expect(mockModels.Contact.findAll.mock.calls[0][0].limit).toBe(5)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return error if name query contains non alphanumeric character', async () => {
      mockReq.query.name = 'na"me'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return error if phone query contains non numeric character', async () => {
      mockReq.query.phone = '32a'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })

    it('should return error if email query contains non alphanumeric character', async () => {
      mockReq.query.email = 'ema"il'
      await require('../../controllers/contacts').listContacts(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
    })
  })

  describe('get contact', () => {
    const contactData = {
      id: 5,
      name: 'Hollie Graham',
      company: 'Turner, Fox and Jones',
      address: 'Studio 54 Rogers Mills West Abigailton CH64 3TH',
      phone: '+44(0)2467 427810',
      email: 'hollie_graham@gmail.com',
      notes: 'Real estate agent, Flat 84 King Plains',
      createdAt: 'createdAt'
    }
    const mockReq = { params: {} }

    beforeEach(() => {
      jest.spyOn(mockModels.Contact, 'findByPk').mockImplementation((id) => {
        if (id === 5) {
          return contactData
        }
        return null
      })
      mockReq.params = {}
    })

    it('should return error if id is undefined', async () => {
      await require('../../controllers/contacts').getContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id is not valid', async () => {
      mockReq.params.id = 'text'
      await require('../../controllers/contacts').getContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id not found', async () => {
      mockReq.params.id = 8
      await require('../../controllers/contacts').getContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(404)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Contact not found!')
    })

    it('should return contact', async () => {
      mockReq.params.id = 5
      await require('../../controllers/contacts').getContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toBe(contactData)
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
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('No data!')
    })

    it('should return error if body is empty', async () => {
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if name is not given', async () => {
      mockReq.body = { ...contactData }
      delete mockReq.body.name
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if name is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.name = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if company is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.company = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('company')
    })

    it('should return error if address is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.address = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('address')
    })

    it('should return error if phone is not given', async () => {
      mockReq.body = { ...contactData }
      delete mockReq.body.phone
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should return error if phone is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.phone = 'text'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should return error if email is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.email = 'text'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('email')
    })

    it('should return error if notes is not valid', async () => {
      mockReq.body = { ...contactData }
      mockReq.body.notes = 'te"xt'
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('notes')
    })

    it('should create contact when only name and phone given', async () => {
      mockReq.body = {
        name: contactData.name,
        phone: contactData.phone
      }
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockModels.Contact.create.mock.calls.length).toBe(1)
      expect(mockModels.Contact.create.mock.calls[0][0]).toEqual(mockReq.body)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(201)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('name')
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('phone')
      expect(mockRes.json.mock.calls[0][0]).toHaveProperty('createdAt')
    })

    it('should create contact', async () => {
      mockReq.body = { ...contactData }
      await require('../../controllers/contacts').addContact(mockReq, mockRes)
      expect(mockModels.Contact.create.mock.calls.length).toBe(1)
      expect(mockModels.Contact.create.mock.calls[0][0]).toEqual(mockReq.body)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(201)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toEqual({
        ...mockReq.body,
        createdAt: 'createdAt'
      })
    })
  })

  describe('edit contact', () => {
    const initialContactData = {
      id: 5,
      name: 'Hollie Graham',
      company: 'Turner, Fox and Jones',
      address: 'Studio 54 Rogers Mills West Abigailton CH64 3TH',
      phone: '+44(0)2467 427810',
      email: 'hollie_graham@gmail.com',
      notes: 'Real estate agent, Flat 84 King Plains',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      update: () => {}
    }
    const updatedContactData = {
      id: 5,
      name: 'name',
      company: 'Turner, Fox and Jones',
      address: 'Studio 54 Rogers Mills West Abigailton CH64 3TH',
      phone: '+44(0)2467 427810',
      email: 'hollie_graham@gmail.com',
      notes: 'Real estate agent, Flat 84 King Plains',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
    const mockReq = { params: {}, body: {} }

    beforeEach(() => {
      jest.spyOn(mockModels.Contact, 'findByPk').mockImplementation((id) => {
        if (id === 5) {
          return initialContactData
        }
        return null
      })
      jest.spyOn(initialContactData, 'update').mockImplementation(() => updatedContactData)
      mockReq.params = {}
      mockReq.body = {}
    })

    it('should return error if body is undefined', async () => {
      delete mockReq.body
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('No data!')
    })

    it('should return error if body is empty', async () => {
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('at least 1 key')
    })

    it('should return error if name is not valid', async () => {
      mockReq.body.name = 'te"xt'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('name')
    })

    it('should return error if company is not valid', async () => {
      mockReq.body.company = 'te"xt'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('company')
    })

    it('should return error if address is not valid', async () => {
      mockReq.body.address = 'te"xt'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('address')
    })

    it('should return error if phone is not valid', async () => {
      mockReq.body.phone = 'text'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('phone')
    })

    it('should return error if email is not valid', async () => {
      mockReq.body.email = 'text'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('email')
    })

    it('should return error if notes is not valid', async () => {
      mockReq.body.notes = 'te"xt'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('notes')
    })

    it('should return error if id is undefined', async () => {
      mockReq.body.name = 'name'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id is not valid', async () => {
      mockReq.params.id = 'text'
      mockReq.body.name = 'name'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id not found', async () => {
      mockReq.params.id = 8
      mockReq.body.name = 'name'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(404)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Contact not found!')
    })

    it('should update contact', async () => {
      mockReq.params.id = 5
      mockReq.body.name = 'name'
      await require('../../controllers/contacts').editContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(initialContactData.update.mock.calls.length).toBe(1)
      expect(initialContactData.update.mock.calls[0][0]).toEqual({ name: 'name' })
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0]).toBe(updatedContactData)
    })
  })

  describe('delete contact', () => {
    const contactData = {
      id: 5,
      destroy: () => {}
    }
    const mockReq = { params: {} }

    beforeEach(() => {
      jest.spyOn(mockModels.Contact, 'findByPk').mockImplementation((id) => {
        if (id === 5) {
          return contactData
        }
        return null
      })
      jest.spyOn(contactData, 'destroy')
      mockReq.params = {}
    })

    it('should return error if id is undefined', async () => {
      await require('../../controllers/contacts').deleteContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id is not valid', async () => {
      mockReq.params.id = 'text'
      await require('../../controllers/contacts').deleteContact(mockReq, mockRes)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(400)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Validation error!')
      expect(mockRes.json.mock.calls[0][0].details).toContain('id')
    })

    it('should return error if id not found', async () => {
      mockReq.params.id = 8
      await require('../../controllers/contacts').deleteContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(404)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].error).toBe(true)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Contact not found!')
    })

    it('should return success message', async () => {
      mockReq.params.id = 5
      await require('../../controllers/contacts').deleteContact(mockReq, mockRes)
      expect(mockModels.Contact.findByPk.mock.calls.length).toBe(1)
      expect(mockModels.Contact.findByPk.mock.calls[0][0]).toBe(mockReq.params.id)
      expect(contactData.destroy.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls.length).toBe(1)
      expect(mockRes.status.mock.calls[0][0]).toBe(200)
      expect(mockRes.json.mock.calls.length).toBe(1)
      expect(mockRes.json.mock.calls[0][0].message).toBe('Contact deleted successfully!')
    })
  })
})
