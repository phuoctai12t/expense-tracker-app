import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  color: string
}

export default function Circle({ color }: Props) {
  return <View style={[styles.container, { backgroundColor: color }]} />
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    height: 25,
    width: 25,
  },
})
