export default {
  getPropName: (prop: any, value: any) => {
    for (const i in prop) {
      if (prop[i] == value) {
        return i
      }
    }
    return false
  },

  isEmpty: (obj: any) => {
    return (
      !obj || // 👈 null and undefined check
      (Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)
    )
  },
}
