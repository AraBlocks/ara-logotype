'use strict'

const {
  DOWNLOADED,
  DOWNLOADING,
  PUBLISHED,
  PUBLISHING
 } = require('../lib/constants/stateManagement')
const { ipcRenderer, remote } = require('electron')
const isDev = require('electron-is-dev')
const windowManager = remote.require('electron-window-manager')
const store = windowManager.sharedData.fetch('store')

const FileManager = require('./views/fileManager/container')
const fileManager = new FileManager(store)
document.getElementById('container').appendChild(fileManager.render())

ipcRenderer.on(DOWNLOADING, () => fileManager.rerender())
// ipcRenderer.on(DOWNLOADED, () => fileManager.rerender())
ipcRenderer.on(PUBLISHING, () => fileManager.rerender())
ipcRenderer.on(PUBLISHED, () => fileManager.rerender())

isDev && (window.components = { fileManager })