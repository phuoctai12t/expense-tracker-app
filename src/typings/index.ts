// ===== STORAGE =====
export type StorageParamList = {
  token: undefined
}

// ==== TYPE DEFINITIONS =====
export type Gender = 'male' | 'femail'

export type Id = {
  _id: string
}

export type User = Id &
  EditUserParams & {
    resetLink: string
    email: string
  }

export type RevenueExpenseType = 'thu' | 'chi'

export type RevenueExpense = Id & CreateRevenueExpenseParams

export type Group = Id & CreateGroupParams

// ==== API PARAMS ====
export type BaseSuccessResponse = {
  message: string
}

// AUTH
export type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}

export type SignUpParams = {
  name: string
  email: string
  password: string
}

export type ForgotPasswordParams = {
  email: string
}

export type ResetPasswordParams = {
  resetLink: string
  newPass: string
}

// GROUP
export type CreateGroupParams = {
  name: string
  color: string
  type: RevenueExpenseType
}

// USER
export type EditUserParams = {
  name: string
  avatar: string
}

export type ChangePasswordParams = {
  oldPassword: string
  password: string
}

// REVENUE EXPENSE
export type CreateRevenueExpenseParams = {
  money: number
  note: string
  group: string
  date: string
  type: RevenueExpenseType
}

export type StatisticByGroupDetail = Id & {
  group_name: string
  totalMoney: number
  group_color: string
  /** 0 -> 1 */
  ratio: number
}

export type StatisticByGroup = {
  expenditures: StatisticByGroupDetail[]
  receipts: StatisticByGroupDetail[]
  tongChi: number
  tongThu: number
}

export interface StatisticByDatePostDetail extends Omit<RevenueExpense, '_id'> {
  id: string
  type: RevenueExpenseType
  color: string
}

export type StatisticByDate = {
  _id: number
  post: StatisticByDatePostDetail[]
  date: string
  tongThu: number
  tongChi: number
}

// ==== OTHERS ====
export type BaseError<T = any> = {
  errors?: T
  message: string
}

export type RadioItem = {
  name: string
  value: any
}
