'use strict'

const fs = require('fs')
const remote = require('electron').remote;
const windowManager = remote.require('electron-window-manager')
const windowManagement = require('./lib/store/windowManagement')
const views = __dirname + '/views/'

const exclude = [ 'fileManager.js', 'styles', 'fileManager', 'mainManager' ]

fs.readdirSync(views).forEach(createElement)

function createElement(view) {
  if (exclude.includes(view)) { return }
  view = view.slice(0, -3)

  const handler = (e) => {
    windowManager.bridge.emit(view)
    windowManager.sharedData.set('current', view)
  }

  const button = document.createElement('button')
  button.innerHTML = view
  button.onclick = handler
  document.body.appendChild(button)
  const br = document.createElement('br')
  document.body.appendChild(br)
}

const button = document.createElement('button')
button.innerHTML = 'create modal'
button.onclick = () => windowManagement.openModal()
document.body.appendChild(button)
const br = document.createElement('br')
document.body.appendChild(br)
