import { ListItem, Text } from '@rneui/themed'
import { Colors, Style } from 'constant'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RadioItem } from 'typings'

type Props = {
  data: RadioItem[]
  selectedValue: any
  listTitle?: string
  onSelect: (item: RadioItem) => void
}

export default function Radios({ data, selectedValue, listTitle, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {listTitle ? <Text style={styles.listTitle}>{listTitle}</Text> : null}
      {data.map(item => (
        <ListItem key={item.value} onPress={() => onSelect(item)}>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <Icon
            color={item.value === selectedValue ? Colors.primary : 'transparent'}
            name="checkmark"
            size={25}
          />
        </ListItem>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Style.mb1,
  },
  listTitle: {
    ...Style.mb,
    ...Style.label,
  },
})
