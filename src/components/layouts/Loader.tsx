import { ActivityIndicator } from 'components/common'
import { Style } from 'constant'
import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'

type Props = {
  visible: boolean
}

export default function Loader({ visible }: Props) {
  return (
    <Modal statusBarTranslucent transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.box}>
          <ActivityIndicator resetStyle />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  box: {
    ...Style.borderRadius1,
    ...Style.backgroundWhite,
    padding: 25,
  },
  container: {
    ...Style.flexCenter,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})
