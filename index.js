'use strict'

const config = require('config')
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(routes)

const port = config.get('port')
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
