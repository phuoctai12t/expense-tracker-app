import { Button, Icon, Input, ListItem, Text } from '@rneui/themed'
import { revenueExpenseApi } from 'api'
import { Footer, GroupItem, RadiosReveuneExpensive } from 'components/common'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Colors, Style } from 'constant'
import dayjs from 'dayjs'
import { app, date as dateHelper, number, toast, validation } from 'helpers'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ModalSelector, { IOption } from 'react-native-modal-selector'
import { useStore } from 'store'
import { CreateRevenueExpenseParams, Group, RevenueExpenseType } from 'typings'
import { RootStackScreenProps } from 'typings/navigation'

export default function AddRevenueExpense({
  navigation,
}: RootStackScreenProps<'AddRevenueExpense'>) {
  const { groups, months, addMonth } = useStore()
  const { loader, showLoader, hideLoader } = useStore()
  const [currentType, setCurrentType] = useState<RevenueExpenseType>(
    groups.thu.length ? 'thu' : 'chi'
  )
  const [currentGroup, setCurrentGroup] = useState<Group>()
  const [date, setDate] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CreateRevenueExpenseParams>({
    defaultValues: { money: 0 },
  })

  const reveuneSelectList: IOption[] = groups.thu.map(item => ({
    key: item._id,
    label: item.name,
  }))
  const expenseSelectList: IOption[] = groups.chi.map(item => ({
    key: item._id,
    label: item.name,
  }))

  useLayoutEffect(() => {
    const goToAddGroup = () => navigation.navigate('AddGroup')

    navigation.setOptions({
      headerRight: () => <Button title="Thêm nhóm" onPress={goToAddGroup} />,
    })
  }, [navigation])

  useEffect(() => {
    setCurrentGroup(undefined)
  }, [currentType])

  const onSelectType = (type: RevenueExpenseType) => {
    if (groups[type].length) {
      setCurrentType(type)
    } else {
      Alert.alert(
        'Thông báo',
        `Bạn chưa thêm nhóm ${type === 'thu' ? 'thu' : 'chi'} nào, bạn có muốn thêm không?`,
        [
          { text: 'Để sau' },
          {
            text: 'Thêm ngay',
            onPress: () => navigation.navigate('AddGroup', { initialType: type }),
          },
        ]
      )
    }
  }

  const onSelectGroup = (option: IOption) => {
    const _group = groups[currentType].find(item => item._id === option.key)
    setCurrentGroup(_group)
    clearErrors('group')
  }

  const showDatePicker = () => setDatePickerVisible(true)
  const hideDatePicker = () => setDatePickerVisible(false)
  const onConfirmSelectDate = (date: Date) => {
    hideDatePicker()
    setDate(date)
  }

  const submit = () => {
    if (!currentGroup) {
      setError('group', { message: 'Vui lòng chọn nhóm' })
    }

    handleSubmit(async ({ money, note }) => {
      showLoader()
      const response = await revenueExpenseApi.create({
        type: currentType,
        group: currentGroup?._id as string,
        money,
        date: date.toISOString(),
        note,
      })
      if (response.ok && response.data) {
        const month = response.data.date
        const existUnix = months
          .find(item => item.isSame(month, 'month'))
          ?.unix()
          ?.toString()
        addMonth(month)
        toast.success('Thêm thu chi thành công')
        navigation.navigate('Home', {
          screen: existUnix || dayjs().unix().toString(),
        })
      }
      hideLoader()
    })()
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <DateTimePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        locale="vi"
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={onConfirmSelectDate}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={[Style.py, Style.pxGap]}
        extraScrollHeight={50}
      >
        <RadiosReveuneExpensive value={currentType} onSelect={onSelectType} />

        <View style={Style.mb1}>
          {errors.group ? (
            <Text style={[Style.textDanger, Style.mb]}>{errors.group.message}</Text>
          ) : (
            <Text style={[Style.label, Style.mb]}>Nhóm</Text>
          )}
          <ModalSelector
            backdropPressToClose
            data={currentType === 'thu' ? reveuneSelectList : expenseSelectList}
            onChange={onSelectGroup}
          >
            {currentGroup ? (
              <GroupItem item={currentGroup} />
            ) : (
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title style={{ color: Colors.gray3 }}>
                    Chọn nhóm {currentType === 'thu' ? 'thu' : 'chi'}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron size={25} />
              </ListItem>
            )}
          </ModalSelector>
        </View>

        {errors.money ? (
          <Text style={Style.textDanger}>{errors.money.message}</Text>
        ) : (
          <Text style={Style.label}>Số tiền</Text>
        )}
        <Controller
          control={control}
          name="money"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              editable={!loader}
              keyboardType="decimal-pad"
              leftIcon={app.getIcon('attach-money')}
              returnKeyType="done"
              value={number.toMoney(value)}
              onBlur={onBlur}
              onChangeText={_value => onChange(number.toMoneyWithCurrency(value, _value))}
            />
          )}
          rules={{
            validate: validation.money,
          }}
        />

        <Text style={[Style.label, Style.mb]}>Thời gian</Text>
        <ListItem style={Style.mb1} onPress={showDatePicker}>
          <Icon color={Colors.primary} name="calendar-today" />
          <ListItem.Content>
            <ListItem.Title>
              {dateHelper.format(date)}
              {dateHelper.isToday(date) ? ' (Hôm nay)' : ''}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <Text style={Style.label}>Ghi chú</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              editable={!loader}
              leftIcon={app.getIcon('notes')}
              placeholder="Nhập ghi chú"
              returnKeyType="done"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
      </KeyboardAwareScrollView>
      <Footer disabled={loader} title="Thêm thu chi" onPress={submit} />
    </SafeAreaView>
  )
}
