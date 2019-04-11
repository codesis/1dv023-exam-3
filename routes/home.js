'use strict'

require('dotenv').config()
const router = require('express').Router()
// const rp = require('request-promise')

// Render index page with login form
router.route('/').get(function (req, res) {
  res.render('home/index')
})
// router.route('/')
//   .get(function (req, res) {
//     const key = process.env.GITHUB_ACCESS_KEY
//     const options = {
//       uri: 'https://api.github.com/repos/1dv023/ek222re-examination-3/issues',
//       headers: {
//         'Authorization': ' TOKEN ' + key,
//         'Accept': 'application/vnd.github.v3+json',
//         'User-Agent': 'Codesis'
//       },
//       json: true
//     }
//     rp(options)
//       .then(function (resp) {
//         const context = {
//           issues: resp.map(function (issue) {
//             return {
//               id: issue.id,
//               title: issue.title,
//               issueBody: issue.body,
//               comments: issue.comments,
//               issueURL: issue.url,
//               created: issue.created_at,
//               updated: issue.updated_at
//             }
//           })
//         }
//         res.render('home/index.hbs', context)
//       })
//       .catch(function (err) {
//         console.err(err)
//       })
//   })

module.exports = router
