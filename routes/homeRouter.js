'use strict'

require('dotenv').config()
const router = require('express').Router()
const github = require('octonode')
const client = github.client(process.env.GITHUBTOKEN)
const repo = client.repo('1dv023/ek222re-examination-3')

// Render index page with login form
router.route('/').get(function (req, res) {
  repo.issues((err, data) => {
    if (err) {
      res.send(err)
    }
    const context = {
      issues: data.map(function (issue) {
        return {
          id: issue.id,
          number: issue.number,
          user: issue.user.login,
          title: issue.title,
          body: issue.body,
          link: issue.html_url,
          created: issue.created,
          updated: issue.updated,
          commentsCount: issue.comments
        }
      })
    }
    res.render('home/index', {
      issues: context.issues
    })
  })
})

module.exports = router