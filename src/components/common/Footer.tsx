import { Button } from '@rneui/themed'
import { Style } from 'constant'
import { StyleSheet } from 'react-native'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import type { ButtonProps } from '@rneui/themed'

export default function Footer({ containerStyle, ...others }: ButtonProps) {
  return (
    <KeyboardAccessoryView alwaysVisible androidAdjustResize>
      <Button containerStyle={[styles.button, containerStyle]} title="Tiếp tục" {...others} />
    </KeyboardAccessoryView>
  )
}

const styles = StyleSheet.create({
  button: {
    ...Style.my,
    ...Style.pxGap,
  },
})
