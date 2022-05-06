import { Style } from 'constant'
import React from 'react'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'

type Props = RNActivityIndicator['props'] & {
  resetStyle?: boolean
}

export default function ActivityIndicator({ resetStyle, style, ...others }: Props) {
  return (
    <RNActivityIndicator
      animating
      color={'#000'}
      size="large"
      style={resetStyle ? style : [Style.my, style]}
      {...others}
    />
  )
}
