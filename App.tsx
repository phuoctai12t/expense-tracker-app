import LogRocket from '@logrocket/react-native'
import { ThemeProvider } from '@rneui/themed'
import { Layout } from 'constant'
import * as Style from 'constant/Style'
import dayjs from 'dayjs'
import vi from 'dayjs/locale/vi'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import * as Notifications from 'expo-notifications'
import * as Updates from 'expo-updates'
import { useCachedResources } from 'hooks'
import Navigation from 'navigation'
import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

dayjs.locale(vi)
dayjs.extend(localizedFormat)

export default function App() {
  const isLoadingComplete = useCachedResources()

  useEffect(() => {
    !__DEV__ &&
      Updates.checkForUpdateAsync().then(
        update => !update.isAvailable && alert('Không có bản cập nhật mới')
      )

    const updatesEvent = Updates.addListener(async update => {
      switch (update.type) {
        case Updates.UpdateEventType.UPDATE_AVAILABLE:
          Alert.alert('Cập nhật mới', 'Đã tải xong cập nhật mới, bạn có muốn cập nhật không?', [
            { text: 'Để sau', style: 'cancel' },
            { text: 'Cập nhật', onPress: () => Updates.reloadAsync() },
          ])
          break

        case Updates.UpdateEventType.ERROR:
          alert('Có lỗi xảy ra khi cập nhật, vui lòng thử lại sau')
          break
      }
    })

    return () => updatesEvent.remove()
  }, [])

  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={Style.RNElementTheme}>
        <Navigation />
        <Toast
          config={Style.toastConfig}
          topOffset={Layout.statusBarHeight + 10}
          visibilityTime={3000}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
