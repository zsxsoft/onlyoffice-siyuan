const crypto = require('crypto')

const md5 = (text) => {
  const m = crypto.createHash('md5')
  return m.update(text).digest('hex')
}

const officeExts = {
  xls: true,
  xlsx: true,
  ppt: true,
  pptx: true,
  doc: true,
  docx: true,
  ods: true,
  ots: true,
  csv: true,
  dot: true,
  dotx: true,
  rtf: true,
  potx: true,
  odp: true,
  otp: true,
}

module.exports = {
  md5,
  officeExts
}
