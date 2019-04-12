'use strict'

require('dotenv').config()
const router = require('express').Router()
// const rp = require('request-promise')

// Render index page with login form
router.route('/').get(function (req, res) {
  res.render('home/index')
})

module.exports = router
