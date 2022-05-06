import {
  BaseError,
  CreateRevenueExpenseParams,
  RevenueExpense,
  StatisticByDate,
  StatisticByGroup,
} from 'typings'
import api from './api'
import API_CONSTANTS from './constants'

export default {
  getAllMonths: () => api.get<string[], BaseError>(API_CONSTANTS.REVENUE_EXPENSE.MONTH),

  getStatisticByGroup: (month: string) =>
    api.get<StatisticByGroup, BaseError>(API_CONSTANTS.REVENUE_EXPENSE.STATISTIC_BY_GROUP(month)),

  getStatisticByDate: (month: string) =>
    api.get<StatisticByDate[], BaseError>(API_CONSTANTS.REVENUE_EXPENSE.STATISTIC_BY_DATE(month)),

  get: (revenueExpenseId: string) =>
    api.get<RevenueExpense, BaseError>(API_CONSTANTS.REVENUE_EXPENSE.DETAIL(revenueExpenseId)),

  edit: (revenueExpenseId: string, params: Partial<CreateRevenueExpenseParams>) =>
    api.patch<RevenueExpense, BaseError>(
      API_CONSTANTS.REVENUE_EXPENSE.DETAIL(revenueExpenseId),
      params
    ),

  delele: (revenueExpenseId: string) =>
    api.delete<BaseError>(API_CONSTANTS.REVENUE_EXPENSE.DETAIL(revenueExpenseId)),

  create: (params: CreateRevenueExpenseParams) =>
    api.post<RevenueExpense, BaseError>(API_CONSTANTS.REVENUE_EXPENSE.GENERAL, params),
}
