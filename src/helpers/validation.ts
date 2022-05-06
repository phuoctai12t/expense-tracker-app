import { GlobalData } from 'constant'

export default {
  trim: (value: string, text: string) => (value?.trim() ? undefined : text),

  email: (value: string) => {
    const valueTrimed = value?.trim()
    return valueTrimed
      ? new RegExp(GlobalData.regex.email).test(valueTrimed)
        ? undefined
        : 'Email không hợp lệ'
      : 'Vui lòng nhập email'
  },

  money: (value: number) => (value ? undefined : 'Vui lòng nhập số tiền'),
}
