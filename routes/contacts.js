'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/contacts')

router.get('/', controller.getContacts)

module.exports = router
