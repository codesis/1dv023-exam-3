/**
 * Script for when issues are created/deleted or commented
 * Adds or removes issues in real time, as well as creates
 * notifications for what has happened.
 */

let socket = io()

socket.on('issue', function (data) {
    if (data.action === 'opened') {
        addResponse('New issue! User: ' + data.user +
            ', Title: ' + data.title)
    }
    if (data.action === 'reopened') {
        addResponse('Reopened issue! User: ' + data.user + ', Title: ' + data.title)
    }
    if (data.action === 'closed') {
        addResponse('Closed issue! User: ' + data.user + ', Title: ' + data.title)
    }
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

// addResponse shows the notification if there is one
function addResponse(message) {
    document.getElementById('notifDiv').style.display = 'block'

    const text = document.createTextNode(message)
    const li = document.createElement('li')
    const messages = document.getElementById('messages')

    li.appendChild(text)
    messages.appendChild(li)

}

// clearMessages clears the notifications on click
function clearMessages() {
    document.getElementById('messages').innerHTML = ''
    document.getElementById('notifDiv').style.display = 'none'
}

// addIssue adds the issue to the website
function addIssue(number, title, desc, link, comment, created, updated) {
    const issue = document.getElementById('issue')

    const li = document.createElement('li')
    li.setAttribute('id', 'li' + number)

    const div = document.createElement('div')
    div.setAttribute('id', 'ribbon')

    const h3 = document.createElement('h3')
    const text = document.createTextNode('Title: ' + title)
    h3.appendChild(text)

    const pbody = document.createElement('p')
    const body = document.createTextNode('Description: ' + desc)
    pbody.appendChild(body)

    const a = document.createElement('a')
    a.setAttribute('href', link)
    const links = document.createTextNode(link)
    a.appendChild(links)

    const pcomment = document.createElement('p')
    const comm = document.createTextNode('Comments: ' + comment)
    pcomment.appendChild(comm)

    const pcreated = document.createElement('p')
    const creatd = document.createTextNode('Created at: ' + created)
    pcreated.appendChild(creatd)

    const pupdated = document.createElement('p')
    const updatd = document.createTextNode('Updated: ' + updated)
    pupdated.appendChild(updatd)

    const br = document.createElement('br')


    div.appendChild(h3)
    div.appendChild(pbody)
    div.appendChild(a)
    div.appendChild(pcomment)
    div.appendChild(pcreated)
    div.appendChild(pupdated)
    li.appendChild(div)
    issue.appendChild(li)
    li.appendChild(br)


}

// removeIssue removes an issue when it is closed on github
function removeIssue(number) {
    let li = document.getElementById('li' + number)
    li.parentNode.removeChild(li)

}
