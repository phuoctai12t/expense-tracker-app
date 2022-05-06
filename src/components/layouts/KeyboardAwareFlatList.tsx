import { KeyboardAwareFlatList as RNKeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import type { KeyboardAwareFlatListProps } from 'react-native-keyboard-aware-scroll-view'

export default function KeyboardAwareFlatList(props: KeyboardAwareFlatListProps<any>) {
  return (
    <RNKeyboardAwareFlatList extraHeight={200} keyboardShouldPersistTaps="handled" {...props} />
  )
}
