import { Layout } from 'constant'
import React from 'react'
import { View } from 'react-native'

type Props = {
  width?: number
  height?: number
}

export default function Space({ width = Layout.spacing, height = Layout.spacing }: Props) {
  return <View style={{ width, height }} />
}
