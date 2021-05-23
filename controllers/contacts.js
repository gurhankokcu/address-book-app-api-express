'use strict'

const { Contact } = require('../models')

async function listContacts (req, res, next) {
  const contacts = await Contact.findAll()
  res.json(contacts)
}

module.exports = {
  listContacts
}
