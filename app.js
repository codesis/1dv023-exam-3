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
// const escape = require('escape-html')
// const octonode = require('octonode')
// const fs = require('fs')

const GitHubWebhook = require('express-github-webhook')
const webhook = GitHubWebhook({
  path: '/',
  secret: process.env.GITHUB_TOKEN
})

const app = express()
app.use(helmet())

const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(webhook)

// websocket server
io.on('connection', function (socket) {
  console.log('Connected')
  webhook.on('issues', (repo, data) => {
    const action = data.action
    const id = data.issue.id
    const number = data.issue.number
    const user = data.issue.user.login
    const link = data.issue.html_url
    const title = data.issue.title
    const body = data.issue.body
    const comments = data.issue.comments
    const created = data.issue.created_at
    const updated = data.issue.updated_at

    socket.emit('issue', {
      action: action,
      title: title,
      user: user
    })

    if (action === 'opened' || action === 'reopened') {
      socket.emit('listOfIssues', {
        title: title,
        body: body,
        link: link,
        comments: comments,
        created: created,
        updated: updated,
        number: number,
        id: id
      })
    } else if (action === 'closed') {
      socket.emit('removeIssue', {
        title: title,
        body: body,
        link: link,
        comments: comments,
        created: created,
        updated: updated,
        number: number,
        id: id
      })
    }
  })

  webhook.on('issue_comment', (repo, data) => {
    const action = data.action
    const id = data.issue.id
    const user = data.comment.user.login
    const title = data.issue.title
    const comments = data.issue.comments
    const comment = data.comment.body
    const number = data.issue.number

    socket.emit('issue_comment', {
      action: action,
      title: title,
      user: user,
      comment: comment,
      comments: comments,
      number: number,
      id: id
    })
  })
})

// routes
app.get('/', require('./routes/homeRouter.js'))

// starting the server
server.listen(port, () => console.log('Server running on port ' + port))
