import api from './api'
import API_CONSTANTS from './constants'
import type { BaseError, ChangePasswordParams, EditUserParams, User } from 'typings'

export default {
  get: () => api.get<User, BaseError>(API_CONSTANTS.USER.ME),

  edit: (params: Partial<EditUserParams>) =>
    api.patch<User, BaseError>(API_CONSTANTS.USER.ME, params),

  changePassword: (params: Partial<ChangePasswordParams>) =>
    api.patch<User, BaseError>(API_CONSTANTS.USER.CHANGE_PASSWORD, params),
}
