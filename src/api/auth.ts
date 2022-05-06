import {
  BaseError,
  BaseSuccessResponse,
  ForgotPasswordParams,
  LoginParams,
  LoginResponse,
  ResetPasswordParams,
  SignUpParams,
} from 'typings'
import api from './api'
import API_CONSTANTS from './constants'

export default {
  login: (params: LoginParams) =>
    api.post<LoginResponse, BaseError>(API_CONSTANTS.AUTH.LOGIN, params),

  signUp: (params: SignUpParams) =>
    api.post<LoginResponse, BaseError<SignUpParams>>(API_CONSTANTS.AUTH.SIGN_UP, params),

  resetPassword: (params: ResetPasswordParams) =>
    api.put<BaseError>(API_CONSTANTS.AUTH.RESET_PASSWORD, params),

  forgotPassword: (params: ForgotPasswordParams) =>
    api.put<BaseSuccessResponse, BaseError<ForgotPasswordParams>>(
      API_CONSTANTS.AUTH.FORGOT_PASSWORD,
      params
    ),
}
