import { fromHsv, toHsv } from 'react-native-color-picker'

function padZero(str: string, len = 2) {
  len = len || 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export default {
  replaceSpecialCharacters: (str: string) => {
    return str.replace(/[&\\/\\#,+()$~%.'":*?<>{}]/g, '')
  },

  compareIgnoreInsensitive: (str1: string, str2: string) => {
    str1 = str1.trim().replace(/\s\s+/g, ' ').toLowerCase()
    str2 = str2.trim().replace(/\s\s+/g, ' ').toLowerCase()
    return str1 == str2
  },

  getRandomColor: () =>
    fromHsv({
      h: Math.random() * 360,
      s: 1,
      v: 1,
    }),

  getColorInvert: (hex: string) => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.')
    }
    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b)
  },

  isDark: (hex: string) => toHsv(hex).h >= 180,
}
