'use strict'

const debug = require('debug')('acm:kernel:lib:actionCreators:rewards')
const k = require('../../../lib/constants/stateManagement')
const dispatch = require('../reducers/dispatch')
const araContracts = require('ara-contracts')
const { ipcMain } = require('electron')
const windowManager = require('electron-window-manager')
const store = windowManager.sharedData.fetch('store')


ipcMain.on(k.REDEEM_REWARDS, async (event, load) => {
  debug('%s HEARD', k.REDEEM_REWARDS)
  try {
    const { account }= store
    const value = await araContracts.redeemRewards({
      farmerDid: account.userAid,
      password: account.password,
      contentDid: load.did
    })
    dispatch({ type: k.REWARDS_REDEEMED, load: value })
    windowManager.pingView({ view: 'filemanager', event: k.REFRESH })
  } catch (err) {
    debug('Error redeeming rewards: %o', err)
  }
})

