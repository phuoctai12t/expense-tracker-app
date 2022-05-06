import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { Alert, BackHandler } from 'react-native'

export default function useConfirmExitApp() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Xác nhận thoát ứng dụng?', '', [
          {
            text: 'Có',
            onPress: () => BackHandler.exitApp(),
            style: 'cancel',
          },
          { text: 'Không' },
        ])
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )
}
