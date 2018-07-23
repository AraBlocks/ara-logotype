'use strict'

const afs = require('ara-filesystem')

module.exports = async ({ did, password, paths }) => {
  const arafs = await afs.create({ owner: did, password })
  const { afs: { did: id }, mnemonic } = arafs
  arafs.afs.close()

  try {
    await afs.add({
      did: id,
      paths: ['README.md', '.ararc'],
      password
    })
    console.log('added file succesfully')
  } catch (e) {
    console.warn('error in adding')
  }

  let price
  try {
    price = await afs.estimateCommitGasCost({ did: id, password })
  } catch (err) {
    console.log({ err })
  }

  const result = await afs.commit({ did: id, password, price })
  if (result instanceof Error) {
    console.log(result)
  } else {
    console.log("file(s) successfully committed")
    return { did: id, mnemonic }
  }
}