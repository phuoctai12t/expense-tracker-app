import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageParamList } from 'typings'

export default {
  get: async (key: keyof StorageParamList) => {
    const value = await AsyncStorage.getItem(key)
    return value !== null ? JSON.parse(value) : null
  },

  getAllKeys: () => AsyncStorage.getAllKeys(),

  set: (key: keyof StorageParamList, value: any) =>
    AsyncStorage.setItem(key, JSON.stringify(value)),

  remove: (key: keyof StorageParamList) => AsyncStorage.removeItem(key),

  clear: () => AsyncStorage.clear(),

  clearWithout: async (args: (keyof StorageParamList)[]) => {
    const allKeys: any[] = await AsyncStorage.getAllKeys()
    for (const key of allKeys) {
      if (!args.includes(key)) {
        await AsyncStorage.removeItem(key)
      }
    }
  },
}
