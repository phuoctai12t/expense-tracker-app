import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs'
import { Button, Text } from '@rneui/themed'
import { GroupItem } from 'components/common'
import { Layout, Style } from 'constant'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, ListRenderItem, StyleSheet, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useStore } from 'store'
import type { Group as TGroup } from 'typings'
import type { RootStackScreenProps } from 'typings/navigation'

type TabParamList = {
  Revenue: undefined
  Expense: undefined
}

type TabScreenProps<T extends keyof TabParamList> = MaterialTopTabScreenProps<TabParamList, T>

type TabItemProps = TabScreenProps<keyof TabParamList> & {
  data: TGroup[]
  onPress: (item: TGroup) => void
  onDelete: (item: TGroup) => void
  onTabChange: (value: keyof TabParamList) => void
}

const deleteButtonWidth = 75

const styles = StyleSheet.create({
  deleteButton: {
    ...Style.backgroundError,
    height: '100%',
    width: deleteButtonWidth,
  },
})

const Tab = createMaterialTopTabNavigator<TabParamList>()

const TabItem = ({ data, onPress, navigation, onTabChange, onDelete }: TabItemProps) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      const { target } = e
      if (target?.includes('Revenue')) {
        onTabChange('Revenue')
      } else if (target?.includes('Expense')) {
        onTabChange('Expense')
      }
    })

    return unsubscribe
  }, [navigation])

  const renderItem: ListRenderItem<TGroup> = ({ item }) => (
    <GroupItem hasRipple={false} item={item} onPress={onPress} />
  )

  const renderHiddenItem: ListRenderItem<TGroup> = ({ item }) => (
    <View style={[Style.row, Style.justifyEnd]}>
      <Button buttonStyle={styles.deleteButton} title="Xóa" onPress={() => onDelete(item)} />
    </View>
  )

  return (
    <SwipeListView
      disableRightSwipe
      data={data}
      keyExtractor={item => item._id}
      ListEmptyComponent={() => <Text style={Style.noti}>Bạn chưa có nhóm nào</Text>}
      renderHiddenItem={renderHiddenItem}
      renderItem={renderItem}
      rightOpenValue={-deleteButtonWidth}
    />
  )
}

export default function Group({ navigation }: RootStackScreenProps<'Group'>) {
  const { groups, deleteGroup: deleteGroupStore } = useStore()
  const [currentTab, setCurrentTab] = useState<keyof TabParamList>('Revenue')

  useLayoutEffect(() => {
    const goToAddGroup = () =>
      navigation.navigate('AddGroup', { initialType: currentTab === 'Revenue' ? 'thu' : 'chi' })

    navigation.setOptions({
      headerRight: () => <Button title="Thêm nhóm" onPress={goToAddGroup} />,
    })
  }, [navigation, currentTab])

  const goToEditGroup = (group: TGroup) => navigation.navigate('AddGroup', { group })

  const onDeleteGroup = (group: TGroup) => {
    Alert.alert(
      'Bạn có chắc chắn muốn xóa nhóm này?',
      'Khi xóa nhóm, tất cả khoản thu chi của nhóm này cũng sẽ bị xóa theo.',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteGroupStore(group) },
      ]
    )
  }

  return (
    <Tab.Navigator initialLayout={{ width: Layout.width }} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen
        name="Revenue"
        options={{
          title: 'Thu',
        }}
      >
        {({ navigation, route }) => (
          <TabItem
            data={groups.thu}
            navigation={navigation}
            route={route}
            onDelete={onDeleteGroup}
            onPress={goToEditGroup}
            onTabChange={setCurrentTab}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Expense"
        options={{
          title: 'Chi',
        }}
      >
        {({ navigation, route }) => (
          <TabItem
            data={groups.chi}
            navigation={navigation}
            route={route}
            onDelete={onDeleteGroup}
            onPress={goToEditGroup}
            onTabChange={setCurrentTab}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
