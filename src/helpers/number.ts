import { GlobalData } from 'constant'

export default {
  toMoney: (num = 0) =>
    num
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, '$&.')
      .slice(0, -2) + GlobalData.currencyText,

  toMoneyWithCurrency: (previousMoney: number, newValue: string) => {
    if (newValue.length <= GlobalData.currencyText.length + 1) {
      newValue = '0'
    } else {
      // if on press key is backspace
      if (!newValue.includes(GlobalData.currencyText)) {
        newValue = newValue.slice(0, newValue.length - GlobalData.currencyText.length)
      } else {
        // if value is too big
        if (previousMoney >= Math.pow(10, 20)) {
          newValue = newValue.slice(0, newValue.length - (GlobalData.currencyText.length + 1))
        }
      }
    }
    return parseInt(newValue.replace(/[^0-9]/g, ''))
  },
}
