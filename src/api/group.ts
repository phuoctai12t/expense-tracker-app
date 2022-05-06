import { BaseError, CreateGroupParams, Group } from 'typings'
import api from './api'
import API_CONSTANTS from './constants'

export default {
  getAll: () => api.get<Group[], BaseError>(API_CONSTANTS.GROUP.GENERAL),

  get: (groupId: string) => api.get<Group, BaseError>(API_CONSTANTS.GROUP.DETAIL(groupId)),

  create: (params: CreateGroupParams) =>
    api.post<Group, BaseError>(API_CONSTANTS.GROUP.GENERAL, params),

  edit: (groupId: string, params: Partial<CreateGroupParams>) =>
    api.patch<Group, BaseError<CreateGroupParams>>(API_CONSTANTS.GROUP.DETAIL(groupId), params),

  delete: (groupId: string) => api.delete<BaseError>(API_CONSTANTS.GROUP.DETAIL(groupId)),
}
