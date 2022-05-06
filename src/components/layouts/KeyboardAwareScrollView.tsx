import { KeyboardAwareScrollView as RNKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

export default function KeyboardAwareScrollView(props: KeyboardAwareScrollViewProps) {
  return (
    <RNKeyboardAwareScrollView extraHeight={200} keyboardShouldPersistTaps="handled" {...props} />
  )
}
