import dayjs from 'dayjs'

export default {
  format: (date: dayjs.ConfigType) => dayjs(date).format('DD-MM-YYYY'),
  formatShort: (date: dayjs.ConfigType) => dayjs(date).format('MM-YYYY'),
  isToday: (date: dayjs.ConfigType) => dayjs(date).isSame(dayjs(), 'day'),
}
