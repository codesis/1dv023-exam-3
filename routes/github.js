'use strict'

require('dotenv').config()
const router = require('express').Router()
const rp = require('request-promise')

router.route('/')
  .get(function (req, res) {
    const key = process.env.GITHUB_ACCESS_KEY
    const options = {
      uri: 'https://api.github.com/repos/1dv023/ek222re-examination-3/issues',
      headers: {
        'Authorization': ' TOKEN ' + key,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Codesis'
      },
      json: true
    }
    rp(options)
      .then(function (resp) {
        const context = {
          issues: resp.map(function (issue) {

          })
        }
      })
  })
