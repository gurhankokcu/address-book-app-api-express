'use strict'

const express = require('express')
const router = express.Router()

router.use('/', require('./main'))
router.use('/contacts', require('./contacts'))

module.exports = router
