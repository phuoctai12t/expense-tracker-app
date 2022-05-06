import { Style } from 'constant'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'
import type { Edge, SafeAreaViewProps } from 'react-native-safe-area-context'

export default function SafeAreaView({
  style,
  ...others
}: SafeAreaViewProps & { edges?: readonly Edge[] }) {
  return <RNSafeAreaView style={[Style.flex1, style]} {...others} />
}
