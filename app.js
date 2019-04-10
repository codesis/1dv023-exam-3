/**
 * Starting point of application
 */

'use strict'

const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

const server = https.createServer({
  key: fs.readFileSync('./config/')
})

// git token: 5040f36ebe5609430a4156266c42ea2dc1ca6abe
