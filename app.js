/**
 * Starting point of application
 */

'use strict'

require('dotenv').config()

const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const escape = require('escape-html')
const octonode = require('octonode')
const fs = require('fs')
const GitHubWebhook = require('express-github-webhook')

const app = express()
app.use(helmet())

const https = require('https')
const hostname = 'localhost'
const port = process.env.PORT || 3000

app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public/')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.use('/', require('./routes/homeRouter.js'))

// starting the server
app.listen(port, () => console.log('Server running on localhost' + port))

// websocket server
// const io = require('socket.io')(server)
