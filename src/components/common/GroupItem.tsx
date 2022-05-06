import { ListItem } from '@rneui/themed'
import React from 'react'
import { PressableAndroidRippleConfig } from 'react-native'
import { Group } from 'typings'
import Circle from './Circle'

type Props = {
  item: Group
  hasRipple?: boolean
  onPress?: (item: Group) => void
}

export default function GroupItem({ item, hasRipple = true, onPress }: Props) {
  const ripple: PressableAndroidRippleConfig = {}
  !hasRipple && (ripple.color = 'transparent')

  return (
    <ListItem bottomDivider android_ripple={ripple} onPress={() => onPress && onPress(item)}>
      <Circle color={item.color} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={25} />
    </ListItem>
  )
}
