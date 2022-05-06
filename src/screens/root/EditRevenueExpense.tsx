import { Input, Text } from '@rneui/themed'
import { revenueExpenseApi } from 'api'
import { Footer } from 'components/common'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Style } from 'constant'
import { app, number, toast, validation } from 'helpers'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useStore } from 'store'
import { CreateRevenueExpenseParams } from 'typings'
import { RootStackScreenProps } from 'typings/navigation'

export default function EditRevenueExpense({
  navigation,
  route,
}: RootStackScreenProps<'EditRevenueExpense'>) {
  const { revenueExpense } = route.params
  const { loader, showLoader, hideLoader } = useStore()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRevenueExpenseParams>({
    defaultValues: revenueExpense,
  })

  const submit = () => {
    handleSubmit(async ({ money, note }) => {
      showLoader()
      const response = await revenueExpenseApi.edit(revenueExpense.id, { money, note })
      if (response.ok && response.data) {
        toast.success('Sửa thành công')
        navigation.navigate({
          name: 'StatisticDetail',
          params: undefined as any,
          merge: true,
        })
      }
      hideLoader()
    })()
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView
        contentContainerStyle={[Style.py, Style.pxGap]}
        extraScrollHeight={50}
      >
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
              autoFocus
              editable={!loader}
              keyboardType="decimal-pad"
              leftIcon={app.getIcon('attach-money')}
              value={number.toMoney(value)}
              onBlur={onBlur}
              onChangeText={_value => onChange(number.toMoneyWithCurrency(value, _value))}
            />
          )}
          rules={{
            validate: validation.money,
          }}
        />

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
      <Footer disabled={loader} title="Xác nhận" onPress={submit} />
    </SafeAreaView>
  )
}
