'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/contacts')

router.get('/', controller.listContacts)
router.get('/:id', controller.getContact)
router.post('/', controller.addContact)
router.post('/:id', controller.editContact)

module.exports = router
