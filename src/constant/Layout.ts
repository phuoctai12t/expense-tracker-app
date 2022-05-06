import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('window')

export default {
  width,
  height,
  spacing: 10,
  gap: 16,
  headerHeight: 60,
  statusBarHeight: getStatusBarHeight(),
  isSmallDevice: width < 375,
}
