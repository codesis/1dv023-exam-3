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
const port = process.env.PORT || 3000

app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public/')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// starting the server
const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/cscloud19.lnu.se/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cscloud19.lnu.se/cert.pem')
}, app).listen(port, () => {
  console.log('Application started on https://localhost:' + port + '\nPress ctrl+c to terminate at any time')
})
// websocket server
const io = require('socket.io')(server)

// routes
app.use('/', require('./routes/home.js'))
