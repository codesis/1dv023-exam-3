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

const app = express()
app.use(helmet())

const port = process.env.PORT || 3000

app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public/')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// github webhook middleware
const githubMiddleware = require('github-webhook-middleware')({ secret: 'process.env.GITHUB_SECRET' })
// passport authentication
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, cb) {
  cb(null, user)
})
passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})
// github authentication
const GithubStrategy = require('passport-github').Strategy
const GITHUB_CLIENT_ID = 'process.env.GITHUB_CLIENT_ID'
const GITHUB_CLIENT_SECRET = 'process.env.GITHUB_CLIENT_SECRET'
passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://cscloud19.lnu.se/auth/github/callback'
},
function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile)
}))
app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success')
  })
// starting the server
const server = app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log('Application up and running on cscloud19.lnu.se:3000')
})
// configuration for websocket
const io = require('socket.io')(server)
// config for webhooks
app.post('/hooks/github/', githubMiddleware, function (req, res) {
  res.status(200)
  res.send()
  // for notification
  const notification = {
    action: req.body.action,
    user: req.body.issue.user.login,
    title: req.body.issue.title
  }
  // for updating the client
  const xGithubEvent = req.headers['x-github-event']
  // for what to view from an issue
  const context = {
    id: req.body.issue.id,
    title: req.body.issue.title,
    issueBody: req.body.issue.body,
    comments: req.body.issue.comments,
    issueURL: req.body.issue.url,
    created: req.body.issue.created_at,
    updated: req.body.issue.updated_at
  }
  if (xGithubEvent === 'issues') {
    io.emit('issue webhook', notification)
    io.emit('issue body', context)
  } else if (xGithubEvent === 'issue_comment') {
    io.emit('comment webhook', notification)
    io.emit('issue body', context)
  }
})
