/**
 * Script for when issues are created/deleted or commented
 * Adds or removes issues in real time, as well as creates
 * notifications for what has happened.
 */

let socket = io()

socket.on('issue', function (data) {
    addResponse('New issue! User: ' + data.user +
        ', Action: ' + data.action + ', Title: ' + data.title)
})

socket.on('listOfIssues', (data) => {
    addIssue(data.number, data.title, data.body, data.link, data.comments, data.created, data.updated)
})

socket.on('removeIssue', (data) => {
    removeIssue(data.number)
})

socket.on('issue_comment', (data) => {
    if (data.action === 'created') {
        addResponse('New comment! From user: ' + data.user + ', Title: ' + data.title)
    } else {
        addResponse('New notification! From: ' + data.user + ', Action: ' + data.action, +', Title: ' + data.title)
    }
})

function addResponse(message) {
    const text = document.createTextNode(message)
    const li = document.createElement('li')
    const messages = document.getElementById('messages')

    li.appendChild(text)
    messages.appendChild(li)

    socket.emit('issue')
}

function clearMessages() {
    document.getElementById('messages').innerHTML = ''
}

function addIssue(number, title, desc, link, comment, created, updated) {
    const issue = document.getElementById('issue')

    const li = document.createElement('li')
    li.setAttribute('id', 'li' + number)

    const div = document.createElement('div')
    div.setAttribute('id', 'ribbon')

    const h3 = document.createElement('h3')
    const text = document.createTextNode('Title: ' + title)

    const pbody = document.createElement('p')
    const body = document.createTextNode('Description: ' + desc)

    const a = document.createElement('a')
    a.setAttribute('href', link)
    const links = document.createTextNode(link)

    const pcomment = document.createElement('p')
    const comm = document.createTextNode('Comments: ' + comment)

    const pcreated = document.createElement('p')
    const creatd = document.createTextNode('Created at: ' + created)

    const pupdated = document.createElement('p')
    const updatd = document.createTextNode('Updated: ' + updated)

    h3.appendChild(text)
    pbody.appendChild(body)
    a.appendChild(links)
    pcomment.appendChild(comm)
    pcreated.appendChild(creatd)
    pupdated.appendChild(updatd)
    div.appendChild(h3)
    div.appendChild(pbody)
    div.appendChild(a)
    div.appendChild(pcomment)
    div.appendChild(pcreated)
    div.appendChild(pupdated)
    li.appendChild(div)
    issue.appendChild(li)

    socket.emit('listOfIssues')
}

function removeIssue(number) {
    let li = document.getElementById('li' + number)
    li.parentNode.removeChild(li)

    socket.emit('removeIssue')
}
