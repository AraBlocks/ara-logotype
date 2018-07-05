'use strict'

const views = __dirname + '/views/'
const remote = require('electron').remote;
const windowManager = remote.require('electron-window-manager')
const fs = require('fs')

const exclude = [ 'fileManager.js', 'styles', 'fManager' ]

fs.readdirSync(views).forEach(createElement)

function createElement(view) {
  if (exclude.includes(view)) { return }

  const handler = (e) =>{
    windowManager.bridge.emit(view)
    windowManager.sharedData.set('current', view.slice(0, view.length - 3))
  }

  const button = document.createElement('button')
  button.innerHTML = view
  button.onclick = handler
  document.body.appendChild(button)
  const br = document.createElement('br')
  document.body.appendChild(br)
}

