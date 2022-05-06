import { create } from 'apisauce'

const baseURL = ''

const api = create({ baseURL })

export const setNewToken = (token?: string) => {
  if (token) {
    api.setHeader('Authorization', 'Bearer ' + token)
  } else {
    api.deleteHeader('Authorization')
  }
}

export default api
