'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/contacts')

router.get('/', controller.listContacts)
router.get('/:id', controller.getContact)
router.post('/', controller.addContact)
router.patch('/:id', controller.editContact)
router.delete('/:id', controller.deleteContact)

module.exports = router
