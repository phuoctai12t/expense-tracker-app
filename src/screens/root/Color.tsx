import { Footer } from 'components/common'
import { Style } from 'constant'
import React, { useState } from 'react'
import { View } from 'react-native'
import { ColorPicker, fromHsv, toHsv } from 'react-native-color-picker'
import type { RootStackScreenProps } from 'typings/navigation'

export default function Color({ route }: RootStackScreenProps<'Color'>) {
  const { oldColor, onConfirm } = route.params
  const [color, setColor] = useState(toHsv(oldColor))

  const reset = () => setColor(toHsv(oldColor))
  const confirm = () => onConfirm(fromHsv(color))

  return (
    <View style={Style.flex1}>
      <ColorPicker
        color={color}
        hideSliders={true}
        oldColor={oldColor}
        style={Style.flex1}
        onColorChange={setColor}
        onColorSelected={confirm}
        onOldColorSelected={reset}
      />
      <Footer title="Xác nhận" onPress={confirm} />
    </View>
  )
}
