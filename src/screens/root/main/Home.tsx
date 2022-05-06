import Icon from '@expo/vector-icons/Foundation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { Button, Text } from '@rneui/themed'
import { revenueExpenseApi } from 'api'
import { ActivityIndicator, Circle, Space } from 'components/common'
import { Colors, Layout, Style } from 'constant'
import { Dayjs } from 'dayjs'
import { date, number } from 'helpers'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, LogBox, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { NumberArray, Text as SvgText } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import { useStore } from 'store'
import { StatisticByGroup, StatisticByGroupDetail } from 'typings'
import { RootStackScreenProps } from 'typings/navigation'

type TabProps = {
  month: Dayjs
  onGoToStatisticDetail: (month: Dayjs) => void
}

type ChartProps = {
  data: StatisticByGroupDetail[]
}

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

const Tab = createMaterialTopTabNavigator()

const styles = StyleSheet.create({
  box: {
    ...Style.backgroundWhite,
    ...Style.borderRadius1,
    ...Style.shadow,
    ...Style.p,
  },
  button: {
    aspectRatio: 1,
    height: 40,
  },
  chart: {
    ...Style.mb1,
    aspectRatio: 1,
    width: '100%',
  },
  header: {
    ...Style.mb1,
    width: (Layout.width - Layout.gap * 3) / 2,
  },
  heading: {
    ...Style.textBold,
    fontSize: 18,
    textAlign: 'center',
  },
  tabBarItem: {
    minWidth: 85,
    width: Layout.width / 4.5,
  },
  totalMoney: {
    ...Style.textBold,
    ...Style.pb,
    fontSize: 18,
    textAlign: 'center',
  },
})

const Chart = ({ data }: ChartProps) => {
  const chartData = data.map(item => ({
    ...item,
    value: item.totalMoney,
    svg: { fill: item.group_color },
    key: item._id,
  }))

  const Labels = ({ slices }: { slices: any }) => {
    return slices.map((slice: any, index: number) => {
      const { pieCentroid, data }: { pieCentroid: NumberArray[]; data: typeof chartData[0] } = slice
      return (
        <SvgText
          key={index}
          alignmentBaseline={'middle'}
          fill="#000"
          fontSize={14}
          textAnchor={'middle'}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
        >
          {Math.round(data.ratio * 100 * 100) / 100}
        </SvgText>
      )
    })
  }

  return (
    <View style={Style.flex1}>
      <PieChart data={chartData} style={styles.chart}>
        <Labels />
      </PieChart>

      {data.map(item => (
        <View key={item._id} style={[Style.rowCenter, Style.mb]}>
          <Circle color={item.group_color} />
          <Space />
          <Text style={[Style.flex1, Style.textBold]}>
            {item.group_name} <Text>({number.toMoney(item.totalMoney)})</Text>
          </Text>
        </View>
      ))}
    </View>
  )
}

const TabComponent = ({ month, onGoToStatisticDetail }: TabProps) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<StatisticByGroup>()

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  const getData = async () => {
    setLoading(true)
    const response = await revenueExpenseApi.getStatisticByGroup(month.toISOString())
    response.ok && response.data && setData(response.data)
    setLoading(false)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }, [])

  if (!data && loading) return <ActivityIndicator />

  return (
    <ScrollView
      contentContainerStyle={[Style.container]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {data ? (
        <>
          <View style={Style.rowBetween}>
            <View style={[styles.box, styles.header]}>
              <Text style={styles.heading}>Tổng thu</Text>
              <Text style={[styles.totalMoney, Style.textSuccess]}>
                +{number.toMoney(data.tongThu)}
              </Text>
            </View>

            <View style={[styles.box, styles.header]}>
              <Text style={styles.heading}>Tổng chi</Text>
              <Text style={[styles.totalMoney, Style.textDanger]}>
                -{number.toMoney(data.tongChi)}
              </Text>
            </View>
          </View>

          <Button
            containerStyle={Style.mb1}
            title="Xem thống kê chi tiết"
            type="clear"
            onPress={() => onGoToStatisticDetail(month)}
          />

          <View style={Style.row}>
            <Chart data={data.receipts} />
            <Space />
            <Chart data={data.expenditures} />
          </View>
        </>
      ) : loading ? (
        <ActivityIndicator />
      ) : null}
    </ScrollView>
  )
}

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const { groups, months } = useStore()
  const [prevMonths, setPrevMonths] = useState<Dayjs[]>([])

  useEffect(() => {
    const newMonth = months.find(month => prevMonths.every(prevMonth => !prevMonth.isSame(month)))
    if (newMonth) {
      setTimeout(() => {
        navigation.navigate('Home', {
          screen: newMonth.unix().toString(),
        })
        setPrevMonths(months)
      }, 0)
    }
  }, [months])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={Style.row}>
          <Button
            buttonStyle={styles.button}
            title={<Icon color={Colors.white} name="page-export-pdf" size={20} />}
            onPress={onPressExportStatistic}
          />
          <Button
            buttonStyle={[styles.button, Style.ms]}
            title={<Icon color={Colors.white} name="plus" size={20} />}
            onPress={onPressAddReveuneExpense}
          />
        </View>
      ),
    })
  }, [navigation, groups])

  const onPressAddReveuneExpense = () => {
    if (!groups.thu.length && !groups.chi.length) {
      Alert.alert('Thông báo', 'Bạn cần thêm nhóm thu chi trước khi thêm thu chi', [
        { text: 'Để sau' },
        { text: 'Thêm nhóm', onPress: () => navigation.navigate('AddGroup') },
      ])
    } else {
      navigation.navigate('AddRevenueExpense')
    }
  }

  const onPressExportStatistic = () => {
    if (!groups.thu.length && !groups.chi.length) {
      Alert.alert('Thông báo', 'Bạn cần thêm thu chi trước khi sử dụng chức năng xuất thống kê', [
        { text: 'Để sau' },
        { text: 'Thêm thu chi', onPress: onPressAddReveuneExpense },
      ])
    } else {
      navigation.navigate('ExportStatistic')
    }
  }

  const goToStatisticDetail = (month: Dayjs) => navigation.navigate('StatisticDetail', { month })

  return (
    <View style={Style.flex1}>
      {months.length > 0 ? (
        <Tab.Navigator
          screenOptions={{
            lazy: true,
          }}
        >
          {months.map(month => (
            <Tab.Screen
              key={month.unix()}
              name={month.unix().toString()}
              options={{
                title: date.formatShort(month),
                tabBarItemStyle: styles.tabBarItem,
                tabBarScrollEnabled: true,
              }}
            >
              {() => <TabComponent month={month} onGoToStatisticDetail={goToStatisticDetail} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      ) : (
        <Text style={Style.noti}>Bạn chưa có khoản thu chi nào</Text>
      )}
    </View>
  )
}
