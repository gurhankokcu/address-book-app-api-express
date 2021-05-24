'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/contacts')

router.get('/', controller.listContacts)
router.post('/', controller.addContact)

module.exports = router
