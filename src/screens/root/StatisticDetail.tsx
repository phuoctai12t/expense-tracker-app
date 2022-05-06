import Icon from '@expo/vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import { Button, Divider, Text } from '@rneui/themed'
import { revenueExpenseApi } from 'api'
import { ActivityIndicator, Circle } from 'components/common'
import { SafeAreaView } from 'components/layouts'
import { Style } from 'constant'
import dayjs from 'dayjs'
import { number, toast } from 'helpers'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import { useStore } from 'store'
import { StatisticByDate, StatisticByDatePostDetail } from 'typings'
import { RootStackScreenProps } from 'typings/navigation'

const deleteButtonWidth = 75

export default function StatisticDetail({
  navigation,
  route,
}: RootStackScreenProps<'StatisticDetail'>) {
  const [data, setData] = useState<StatisticByDate[]>([])
  const [loading, setLoading] = useState(true)
  const { showLoader, hideLoader, deleteMonth } = useStore()

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await revenueExpenseApi.getStatisticByDate(
          route.params.month.toISOString()
        )
        if (response.ok && response.data) {
          setData(response.data)
          setLoading(false)
        }
      }
      fetchData()
    }, [])
  )

  const goToRevenueExpenseDetail = (revenueExpense: StatisticByDatePostDetail) =>
    navigation.navigate('EditRevenueExpense', { revenueExpense })

  const onDeleteRevenueExpense = (revenueExpense: StatisticByDatePostDetail) => {
    const deleteRevenueExpense = async () => {
      showLoader()
      const response = await revenueExpenseApi.delele(revenueExpense.id)
      if (response.ok) {
        toast.success('Xóa thành công')
        const newData = data
          .map(item => ({ ...item, post: item.post.filter(p => p.id !== revenueExpense.id) }))
          .filter(item => item.post.length)
        if (newData.length) {
          setData(newData)
        } else {
          deleteMonth(revenueExpense.date)
          navigation.goBack()
        }
      }
      hideLoader()
    }

    Alert.alert('Thông báo', 'Xác nhận xóa khoản thu chi?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: deleteRevenueExpense },
    ])
  }

  const renderItem: ListRenderItem<StatisticByDate> = ({ item }) => {
    return (
      <View style={[Style.backgroundWhite, Style.mb1, Style.p, Style.borderRadius1, Style.shadow]}>
        <View style={Style.rowBetween}>
          <Text style={styles.day}>{dayjs(item.date).date()}</Text>
          <View style={Style.alignEnd}>
            <Text style={[styles.totalMoney, Style.textSuccess]}>
              {number.toMoney(item.tongThu)}
            </Text>
            <Text style={[styles.totalMoney, Style.textDanger]}>
              {number.toMoney(item.tongChi)}
            </Text>
          </View>
        </View>

        <Divider style={Style.my1} />

        {item.post.map(p => (
          <View key={p.id} style={Style.mb}>
            <SwipeRow
              disableRightSwipe
              rightOpenValue={-deleteButtonWidth}
              onRowPress={() => goToRevenueExpenseDetail(p)}
            >
              <View style={[Style.row, Style.justifyEnd]}>
                <Button
                  buttonStyle={styles.deleteButton}
                  title="Xóa"
                  onPress={() => onDeleteRevenueExpense(p)}
                />
              </View>

              <View style={[Style.rowCenter, Style.p, Style.border, Style.backgroundWhite]}>
                <Circle color={p.color} />
                <View style={[Style.flex1, Style.mx]}>
                  <Text style={Style.textBold}>{p.group}</Text>
                  {p.note ? <Text>{p.note}</Text> : null}
                </View>
                <Text
                  style={[Style.textBold, p.type === 'thu' ? Style.textSuccess : Style.textDanger]}
                >
                  {number.toMoney(p.money)}
                </Text>
                <Icon name="ios-chevron-forward" size={20} style={Style.ms} />
              </View>
            </SwipeRow>
          </View>
        ))}
      </View>
    )
  }

  if (loading) return <ActivityIndicator />

  return (
    <SafeAreaView edges={['bottom']}>
      <FlatList
        contentContainerStyle={[Style.pt1, Style.pxGap]}
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  day: {
    ...Style.textBold,
    fontSize: 22,
  },
  deleteButton: {
    ...Style.backgroundError,
    height: '100%',
    width: deleteButtonWidth,
  },
  totalMoney: {
    ...Style.textBold,
    fontSize: 16,
  },
})
