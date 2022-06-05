const express = require('express')
const router = express.Router()
const config = require('../config.json')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const { md5, officeExts } = require('../utils')

router.get('/onlyoffice/config', (req, res, next) => {
  const assetPath = req.query.assetPath
  res.header('Access-Control-Allow-Origin', '*')
  console.log(config.dataPath + '/' + assetPath)
  if (!fs.existsSync(config.dataPath + '/' + assetPath)) {
    res.status = 404
    return res.json({ error: 'File not found' })
  }
  const ext = assetPath.split('.').pop() || ''
  if (!officeExts[ext]) {
    return res.json({ error: 'Unknown ext' })
  }
  const token = md5(config.tokenSecret + assetPath + config.tokenSecret)
  const callbackUrl = `${config.host}/onlyoffice/callback?assetPath=${encodeURIComponent(assetPath)}&token=${token}`
  return res.json({
    config: {
      document: {
        fileType: ext,
        key: md5(md5(assetPath)),
        title: path.basename(assetPath),
        url: config.siyuanURL + '/' + assetPath,
      },
      editorConfig: {
        callbackUrl: callbackUrl,
        customization: {
          autosave: true,
          forcesave: true
        },
        lang: 'zh-CN'
      },
      token: '123456'
    },
    js: config.onlyofficeURL + '/web-apps/apps/api/documents/api.js'
  })
})

router.post('/onlyoffice/callback', async (req, res, next) => {
  const assetPath = req.query.assetPath
  const token = req.query.token
  const calculatedToken = md5(config.tokenSecret + assetPath + config.tokenSecret)
  if (token !== calculatedToken) {
    return res.json({ error: 1, message: 'Token mismatch' })
  }
  const filePath = config.dataPath + '/' + assetPath
  const { status, url } = req.body
  if (status === 2 || status === 6) {
    // Fix onlyoffice's 301
    const ret = await axios(url.replace(/^http:/, 'https:'), {responseType: 'arraybuffer'})
    fs.writeFileSync(filePath, ret.data)
  }
  return res.json({ error: 0 })
})
module.exports = router
