'use strict'

const config = require('config')
const Joi = require('joi')
const Op = require('sequelize').Op
const { Contact } = require('../models')

const listSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  operator: Joi.string().valid('and', 'or').default('and'),
  name: Joi.string().pattern(/^[a-zA-Z0-9 ]{1,50}$/),
  phone: Joi.string().pattern(/^[0-9()+ ]{1,20}$/),
  email: Joi.string().pattern(/^[a-zA-Z0-9@.+_-]{1,200}$/)
})

const getSchema = Joi.object({
  id: Joi.number().required()
})

const createSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9 ]{1,50}$/).required(),
  company: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,100}$/),
  address: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,200}$/),
  phone: Joi.string().pattern(/^[0-9()+ ]{1,20}$/).required(),
  email: Joi.string().email().max(200),
  notes: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,500}$/)
})

const editSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9 ]{1,50}$/),
  company: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,100}$/),
  address: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,200}$/),
  phone: Joi.string().pattern(/^[0-9()+ ]{1,20}$/),
  email: Joi.string().email().max(200),
  notes: Joi.string().pattern(/^[a-zA-Z0-9\-, ]{1,500}$/)
}).min(1)

async function listContacts (req, res) {
  const { value, error } = listSchema.validate(req.query)
  if (error) {
    return res.status(400).json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
  }

  const pagesize = config.get('pagesize')

  const where = []
  if (value.name) {
    where.push({ name: { [Op.like]: `%${value.name}%` } })
  }
  if (value.phone) {
    where.push({ phone: { [Op.like]: `%${value.phone}%` } })
  }
  if (value.email) {
    where.push({ email: { [Op.like]: `%${value.email}%` } })
  }

  const contacts = await Contact.findAll({
    where: { [Op[value.operator]]: where },
    offset: (value.page - 1) * pagesize,
    limit: pagesize
  })
  res.status(200).json(contacts)
}

async function validateIdAndGetContact (req, res) {
  const { value, error } = getSchema.validate(req.params)
  if (error) {
    res.status(400).json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
    return
  }
  const contact = await Contact.findByPk(value.id)
  if (!contact) {
    res.status(404).json({
      error: true,
      message: 'Contact not found!'
    })
    return
  }
  return contact
}

async function getContact (req, res) {
  const contact = await validateIdAndGetContact(req, res)
  if (contact) {
    res.status(200).json(contact)
  }
}

async function addContact (req, res) {
  if (!req.body) {
    return res.status(400).json({
      error: true,
      message: 'No data!'
    })
  }
  const { value, error } = createSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
  }
  const contact = await Contact.create(value)
  res.status(201).json(contact)
}

async function editContact (req, res) {
  if (!req.body) {
    return res.status(400).json({
      error: true,
      message: 'No data!'
    })
  }
  const { value, error } = editSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
  }
  const contact = await validateIdAndGetContact(req, res)
  if (contact) {
    const updatedContact = await contact.update(value)
    res.status(200).json(updatedContact)
  }
}

async function deleteContact (req, res) {
  const contact = await validateIdAndGetContact(req, res)
  if (contact) {
    await contact.destroy()
    res.status(200).json({
      message: 'Contact deleted successfully!'
    })
  }
}

module.exports = {
  listContacts,
  getContact,
  addContact,
  editContact,
  deleteContact
}
