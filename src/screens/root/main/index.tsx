import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors, Layout } from 'constant'
import { useConfirmExitApp } from 'hooks'
import { Platform } from 'react-native'
import Account from './Account'
import Group from './Group'
import Home from './Home'
import type { BottomTabParamList } from 'typings/navigation'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function Main() {
  useConfirmExitApp()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRightContainerStyle: {
          right: Layout.gap,
        },
        tabBarHideOnKeyboard: Platform.select({ android: true }),
        headerStyle: {
          height: Layout.statusBarHeight + Layout.headerHeight,
        },
      }}
    >
      <BottomTab.Screen
        component={Home}
        name="Home"
        options={{
          title: 'Thu chi',
          tabBarIcon: ({ size, focused }) => (
            <Icon color={focused ? Colors.primary : Colors.gray3} name="home" size={size} />
          ),
          headerTitleAlign: 'left',
        }}
      />
      <BottomTab.Screen
        component={Group}
        name="Group"
        options={{
          title: 'Nhóm',
          tabBarIcon: ({ size, focused }) => (
            <Icon color={focused ? Colors.primary : Colors.gray3} name="book" size={size} />
          ),
          headerTitleAlign: 'left',
        }}
      />
      <BottomTab.Screen
        component={Account}
        name="Account"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Icon color={focused ? Colors.primary : Colors.gray3} name="account" size={size} />
          ),
          title: 'Tài khoản',
        }}
      />
    </BottomTab.Navigator>
  )
}
