'use strict'

const config = require('config')
const Joi = require('joi')
const Op = require('sequelize').Op
const { Contact } = require('../models')

const querySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  operator: Joi.string().valid('and', 'or').default('and'),
  name: Joi.string().pattern(/^[a-zA-Z0-9]{1,30}$/),
  phone: Joi.string().pattern(/^[0-9]{1,30}$/),
  email: Joi.string().pattern(/^[a-zA-Z0-9@.+_-]{1,30}$/)
})

async function listContacts (req, res, next) {
  const { value, error } = querySchema.validate(req.query)
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

module.exports = {
  listContacts
}
