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

async function listContacts (req, res) {
  const { value, error } = listSchema.validate(req.query)
  if (error) {
    return res.json({
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
  res.json(contacts)
}

async function getContact (req, res) {
  const { value, error } = getSchema.validate(req.params)
  if (error) {
    return res.json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
  }
  const contact = await Contact.findByPk(value.id)
  if (!contact) {
    return res.json({
      error: true,
      message: 'Contact not found!'
    })
  }
  res.json(contact)
}

async function addContact (req, res) {
  const { value, error } = createSchema.validate(req.body || {})
  if (error) {
    return res.json({
      error: true,
      message: 'Validation error!',
      details: error.message
    })
  }
  const contact = await Contact.create(value)
  res.json(contact)
}

module.exports = {
  listContacts,
  getContact,
  addContact
}
