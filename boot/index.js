'use strict'

const debug = require('debug')('afm:boot:main')

const writeFiles = require('./writeFiles')
//Writes .ara and keyrings if doesn't exist
writeFiles.updateAraRC()
writeFiles.writeDotAra()

const { app } = require('electron')
const { application, stateManagement: k } = require('k')
const windowManager = require('../kernel/lib/lsWindowManager')
const { internalEmitter } = require('electron-window-manager')
const analytics = require('../kernel/redux/actions/analytics')
const { cleanOutdatedData } = require('../kernel/redux/actions/afmManager')
const cleanUp = require('./cleanUp')
const { handleDeepLink, deeplinkWaiting } = require('./deepLink')

require('./preventMultInstances')//Prevent windows from making multiple instances of app
cleanOutdatedData() //!!! Very Dangerous code !!!

app.setName(application.APP_NAME)
app.on('ready', () => {
  debug('App initialzed')
  windowManager.init()

  require('./squirrel')
  require('./tray').buildTray()
  require('./menu').buildMenu()
  require('../kernel/redux/actionCreators')//TODO: create proper store creation function
  require('./applyDevSettings')

  internalEmitter.emit(k.GET_CACHED_DID)//Loads login screen input with last DID user logged in with
  analytics.trackAppOpen()

  //Opens login view if app not started with loggedin mode on and app not opened with deeplink
  if (process.argv.includes('loggedin') === false && deeplinkWaiting() === false) {
    windowManager.openWindow('login')
  }
})

//Prevents app from closing when all windows are closed
app.on('window-all-closed', () => { })

// For Deep Linking
app.setAsDefaultProtocolClient('ara')
app.on('open-url', handleDeepLink)

app.on('before-quit', cleanUp)

process.on('uncaughtException', async err => {
  await analytics.trackError(err.stack)
  debug('uncaught exception: %o', err)
})

process.on('unhandledRejection', async err => {
  await analytics.trackError(err.stack)
  debug('unhandled rejection: %o', err)
})