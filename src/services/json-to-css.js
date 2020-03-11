export function json2CSS(json) {
  return Object.keys(json).reduce((acc, tag) => {
    acc += tag
    acc += JSON.stringify(json[tag])
      .replace(/"/g, '')
      .replace(/,/g, ';')
    return acc
  }, '')
}

export function varsToHexadecimal(obj, raw) {
  return Object.keys(obj).reduce((acc, val) => {
    acc[val] = +`0x${+raw[`--${obj[val]}`].replace(/#/, '')}`
    return acc
  }, {})
}
