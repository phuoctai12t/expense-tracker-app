import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import api from 'api/api'
import { ApiResponse } from 'apisauce'
import { Loader } from 'components/layouts'
import { Layout } from 'constant'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { date, storage, toast } from 'helpers'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { ConfirmCode, ForgotPassword, Login, SignUp } from 'screens/auth'
import {
  AddGroup,
  AddRevenueExpense,
  Color,
  EditProfile,
  EditRevenueExpense,
  ExportStatistic,
  Main,
  StatisticDetail,
} from 'screens/root'
import { useStore } from 'store'
import { BaseError } from 'typings'
import type { StackParamList } from 'typings/navigation'

const Stack = createStackNavigator<StackParamList>()

export default function Navigation() {
  const { isLogin, login, logout, loader } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // when save this file, you need to refresh your app, because this funtions will run +1 time when this file is saved
    api.addResponseTransform(r => {
      if (!r.ok) {
        const response = r as ApiResponse<BaseError>
        // eslint-disable-next-line no-console
        console.log({
          config: {
            baseURL: response.config?.baseURL,
            data: response.config?.data ? JSON.parse(response.config.data) : null,
            headers: response.config?.headers,
            method: response.config?.method,
            url: response.config?.url,
          },
          data: response.data,
          duration: response.duration,
          problem: response.problem,
          status: response.status,
        })
        switch (response.problem) {
          case 'CLIENT_ERROR':
            if (response.status === 417) {
              toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
              logout()
            } else {
              !response.data?.errors && toast.error(response.data?.message)
            }
            break
          case 'NETWORK_ERROR':
          case 'CONNECTION_ERROR':
            toast.error('Không có kết nối mạng')
            break
          case 'SERVER_ERROR':
            toast.error('Máy chủ lỗi')
            break
          case 'TIMEOUT_ERROR':
            toast.error('Quá thời gian kêt nối')
            break
          default:
            toast.error()
            break
        }
      }
    })

    const bootstrapAsync = async () => {
      const token = await storage.get('token')
      if (token) {
        const success = await login(token)
        !success && (await logout())
      } else {
        await logout()
      }
      setLoading(false)
    }

    bootstrapAsync()
  }, [])

  const hideSplash = () => SplashScreen.hideAsync()

  if (loading) return null

  return (
    <>
      <NavigationContainer onReady={hideSplash}>
        <Stack.Navigator
          initialRouteName={isLogin ? 'Main' : 'Login'}
          screenOptions={{
            headerBackTitleVisible: false,
            gestureResponseDistance: Platform.OS === 'ios' ? Layout.width : 0,
            headerRightContainerStyle: {
              right: Layout.gap,
            },
            headerStyle: {
              height: Layout.statusBarHeight + Layout.headerHeight,
            },
          }}
        >
          {isLogin ? (
            <Stack.Group>
              <Stack.Screen component={Main} name="Main" options={{ headerShown: false }} />
              <Stack.Screen
                component={AddGroup}
                name="AddGroup"
                options={({ route }) => ({
                  title: route.params?.group ? 'Sửa nhóm' : 'Thêm nhóm',
                })}
              />
              <Stack.Screen
                component={AddRevenueExpense}
                name="AddRevenueExpense"
                options={{
                  title: 'Thêm thu chi',
                  headerTitleAlign: 'left',
                }}
              />
              <Stack.Screen
                component={EditRevenueExpense}
                name="EditRevenueExpense"
                options={({ route }) => ({
                  title:
                    route.params.revenueExpense.type === 'thu' ? 'Sửa khoản thu' : 'Sửa khoản chi',
                })}
              />
              <Stack.Screen
                component={Color}
                name="Color"
                options={{
                  title: 'Chọn màu',
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                component={EditProfile}
                name="EditProfile"
                options={{
                  title: 'Chỉnh sửa thông tin',
                }}
              />
              <Stack.Screen
                component={StatisticDetail}
                name="StatisticDetail"
                options={({ route }) => ({
                  title: date.formatShort(route.params.month),
                  gestureEnabled: false,
                })}
              />
              <Stack.Screen
                component={ExportStatistic}
                name="ExportStatistic"
                options={{
                  title: 'Xuất thống kê',
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />
              <Stack.Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
              <Stack.Screen
                component={ForgotPassword}
                name="ForgotPassword"
                options={{ title: 'Quên mật khẩu' }}
              />
              <Stack.Screen
                component={ConfirmCode}
                name="ConfirmCode"
                options={{ title: 'Xác nhận mã code' }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
      <Loader visible={loader} />
    </>
  )
}
