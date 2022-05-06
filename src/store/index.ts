import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupApi, revenueExpenseApi, userApi } from 'api'
import { setNewToken } from 'api/api'
import dayjs, { Dayjs } from 'dayjs'
import { storage, toast } from 'helpers'
import { Group, User } from 'typings'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  loader: boolean
  showLoader: () => void
  hideLoader: () => void

  userData: User
  setUserData: (userData: User) => void

  isLogin: boolean
  login: (token: string) => Promise<boolean>
  logout: () => Promise<void>

  groups: {
    thu: Group[]
    chi: Group[]
  }
  addGroup: (group: Group) => void
  editGroup: (group: Group) => void
  deleteGroup: (group: Group) => void

  months: Dayjs[]
  addMonth: (month: string) => void
  deleteMonth: (month: string) => void
}

// eslint-disable-next-line @typescript-eslint/ban-types
type StatePersist = {}

const useStore = create<State>()((set, get) => ({
  loader: false,
  showLoader: () => set({ loader: true }),
  hideLoader: () => set({ loader: false }),

  userData: {} as User,
  setUserData: (userData: User) => set({ userData }),

  isLogin: false,
  login: async token => {
    setNewToken(token)
    const response = await Promise.all([
      userApi.get(),
      groupApi.getAll(),
      revenueExpenseApi.getAllMonths(),
    ])
    if (response.every(r => r.ok)) {
      const userData = response[0].data as User
      const groups = response[1].data as Group[]
      const months = (response[2].data as string[]).map(month => dayjs(month))
      set({
        userData,
        groups: {
          thu: groups.filter(g => g.type === 'thu'),
          chi: groups.filter(g => g.type === 'chi'),
        },
        months,
        isLogin: true,
      })
      storage.set('token', token)
      return true
    }
    setNewToken()
    return false
  },
  logout: async () => {
    set({ isLogin: false })
    setNewToken()
    storage.remove('token')
  },

  groups: {
    thu: [],
    chi: [],
  },
  addGroup: (group: Group) =>
    set(state => {
      const groups = state.groups
      groups[group.type].unshift(group)
      return { groups }
    }),
  editGroup: (group: Group) =>
    set(state => {
      const groups = state.groups
      groups[group.type] = groups[group.type].map(g => (g._id === group._id ? group : g))
      return { groups }
    }),
  deleteGroup: async (group: Group) => {
    get().showLoader()
    const response = await groupApi.delete(group._id)
    if (response.ok) {
      const response1 = await revenueExpenseApi.getAllMonths()
      if (response1.ok && response1.data) {
        const months = (response1.data as string[]).map(month => dayjs(month))
        months.splice(0, 1)
        set(state => {
          const groups = state.groups
          groups[group.type] = groups[group.type].filter(g => g._id !== group._id)
          return { groups, months }
        })
        toast.success('Xóa nhóm thành công')
      }
    }
    get().hideLoader()
  },
  months: [],
  addMonth: (month: string) => {
    const monthParam = dayjs(month)
    get().months.every(m => !monthParam.isSame(m, 'month')) &&
      set(state => ({
        months: [...state.months, monthParam].sort((a, b) => b.unix() - a.unix()),
      }))
  },
  deleteMonth: (month: string) =>
    set(state => ({ months: state.months.filter(m => !m.isSame(month, 'month')) })),
}))

const useStorePersist = create<StatePersist>()(
  persist(() => ({}), {
    name: 'thuchi', // name of item in the storage (must be unique)
    getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
  })
)

export { useStore, useStorePersist }
