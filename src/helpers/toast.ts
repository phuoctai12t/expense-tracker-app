import { Alert, Platform, Linking } from 'react-native'
import Toast from 'react-native-toast-message'

const permissonType = {
  media: 'truy cập thư viện ảnh',
  camera: 'truy camera',
  location: 'truy cập vị trí',
  writeFile: 'đọc file',
}

export default {
  success: (text: string) => {
    Toast.show({
      type: 'success',
      text2: typeof text === 'string' && text ? text : 'Thành công',
    })
  },

  error: (text?: any) => {
    Toast.show({
      type: 'error',
      text2: typeof text === 'string' && text ? text : 'Có lỗi xảy ra',
    })
  },

  warning: (text = '') => {
    Toast.show({
      type: 'info',
      text2: typeof text === 'string' && text ? text : 'Warning',
    })
  },

  goToSetting: (
    type: 'media' | 'camera' | 'location' | 'writeFile',
    onCancel?: () => void,
    onConfirm?: () => void
  ) => {
    Alert.alert('Thông báo', `Bạn cần cấp quyền ${permissonType[type]} để sử dụng chức năng này`, [
      {
        text: 'Hủy',
        onPress: onCancel,
      },
      {
        text: 'Đi đến cài đặt',
        onPress: () => {
          Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings()
          onConfirm && onConfirm()
        },
      },
    ])
  },
}
