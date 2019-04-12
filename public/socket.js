'use strict'

(function () {
  const socket = io()

  // notification for an issue
  socket.on('issue webhook', (data) => {
    renderNotification(data, 'issue')
  })
  // setting the issue on our page
  socket.on('issue body', (data) => {
    renderIssue(data)
  })
  // notification for a comment
  socket.io('comment webhook', (data) => {
    renderNotification(data, 'comment')
  })
  // render issue
  function renderIssue (issue) {
    const ul = document.getElementById('issueList')
    const li = document.getElementById('issue.id')
    li.innerHTML = 'Title: ' + issue.title +
    'Body: ' + issue.issueBody +
    'Comments: ' + issue.comments +
    'URL: ' + issue.issueURL +
    'Created: ' + issue.created +
    'Updated: ' + issue.updated

    // inserting new issue on top
    ul.insertBefore(li, ul.firstElementChild)
  }
  // render notification
  function renderNotification (notification, typeOfAction) {
    const ul = document.getElementById('notifList')
    const li = document.createElement('li')

    li.innerHTML = 'Action: ' + notification.action + ' ' + typeOfAction +
    'Title: ' + notification.title +
    'User: ' + notification.user

    ul.appendChild(li)
  }
})
