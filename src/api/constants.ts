const API_CONSTANTS = {
  AUTH: {
    LOGIN: 'auth/login',
    SIGN_UP: 'auth/create',
    RESET_PASSWORD: 'auth/reset-password',
    FORGOT_PASSWORD: 'auth/forgot-password',
  },
  USER: {
    ME: 'api/users/me',
    CHANGE_PASSWORD: 'api/users/change-password',
  },
  GROUP: {
    GENERAL: 'api/nhom',
    DETAIL: (groupId: string) => `api/nhom/${groupId}`,
  },
  REVENUE_EXPENSE: {
    GENERAL: 'api/khoan-thu-chi',
    DETAIL: (revenueExpenseId: string) => `api/khoan-thu-chi/${revenueExpenseId}`,
    MONTH: 'api/khoan-thu-chi/thang',
    STATISTIC_BY_GROUP: (month: string) => `api/khoan-thu-chi/thang/${month}/so-do`,
    STATISTIC_BY_DATE: (month: string) => `api/khoan-thu-chi/thang/${month}/ngay`,
  },
}

export default API_CONSTANTS
