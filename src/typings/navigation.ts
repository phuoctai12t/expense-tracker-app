import { StackScreenProps } from '@react-navigation/stack'
import { Dayjs } from 'dayjs'
import { Group, RevenueExpenseType, StatisticByDatePostDetail } from './'

export type BaseTabParam = {
  screen?: string
}

export type AuthStackParamList = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
  ConfirmCode: { email: string }
}

export type RootStackParamList = {
  Main: undefined
  ImagesPicker: { onConfirm: (images: string[]) => void }
  AddRevenueExpense: undefined
  EditRevenueExpense: { revenueExpense: StatisticByDatePostDetail }
  AddGroup: { group?: Group; initialType?: RevenueExpenseType } | undefined
  Color: { oldColor: string; onConfirm: (color: string) => void }
  EditProfile: undefined
  StatisticDetail: { month: Dayjs }
  ExportStatistic: undefined
}

export type BottomTabParamList = {
  Home: BaseTabParam | undefined
  Group: undefined
  Account: undefined
}

export type StackParamList = AuthStackParamList & RootStackParamList & BottomTabParamList

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>

export type RootStackScreenProps<T extends keyof (RootStackParamList & BottomTabParamList)> =
  StackScreenProps<RootStackParamList & BottomTabParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
