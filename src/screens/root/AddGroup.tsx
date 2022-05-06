import { Input, ListItem, Text } from '@rneui/themed'
import { groupApi } from 'api'
import { Circle, Footer, RadiosReveuneExpensive } from 'components/common'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Style } from 'constant'
import { app, string, toast, validation } from 'helpers'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useStore } from 'store'
import type { CreateGroupParams, RevenueExpenseType } from 'typings'
import type { RootStackScreenProps } from 'typings/navigation'

export default function AddGroup({ navigation, route }: RootStackScreenProps<'AddGroup'>) {
  const groupParam = route.params?.group
  const initialType = route.params?.initialType || 'thu'

  const [currentType, setCurrentType] = useState<RevenueExpenseType>(initialType)
  const [color, setColor] = useState(groupParam ? groupParam.color : string.getRandomColor())
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateGroupParams>({ defaultValues: groupParam })
  const { addGroup, editGroup, loader, showLoader, hideLoader } = useStore()

  const chooseColor = () =>
    navigation.navigate('Color', {
      oldColor: color,
      onConfirm: color => {
        setColor(color)
        navigation.navigate({
          name: 'AddGroup',
          params: undefined,
          merge: true,
        })
      },
    })

  const submit = handleSubmit(async ({ name }) => {
    const nameTrimed = name.trim()

    showLoader()
    const response = await (groupParam
      ? groupApi.edit(groupParam._id, { name: nameTrimed, color })
      : groupApi.create({
          name: nameTrimed,
          color,
          type: currentType,
        }))
    if (response.ok) {
      response.data && (groupParam ? editGroup(response.data) : addGroup(response.data))
      toast.success(groupParam ? 'Sửa nhóm thành công' : 'Thêm nhóm thành công')
      navigation.goBack()
    } else if (response.data?.errors) {
      const errors = response.data.errors as CreateGroupParams
      for (const key in errors) {
        const _key = key as keyof CreateGroupParams
        setError(_key, { message: errors[_key] })
      }
    }
    hideLoader()
  })

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView contentContainerStyle={[Style.py, Style.pxGap]}>
        {!groupParam && <RadiosReveuneExpensive value={currentType} onSelect={setCurrentType} />}

        {errors.name ? (
          <Text style={Style.textDanger}>{errors.name.message}</Text>
        ) : (
          <Text style={Style.label}>Tên nhóm</Text>
        )}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              autoFocus
              editable={!loader}
              leftIcon={app.getIcon('bookmark')}
              placeholder="Tên nhóm"
              returnKeyType="done"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          rules={{
            validate: value => validation.trim(value, 'Vui lòng nhập tên nhóm'),
          }}
        />

        <Text style={[Style.label, Style.mb]}>Màu</Text>
        <ListItem disabled={loader} onPress={chooseColor}>
          <Circle color={color} />
          <ListItem.Content />
          <ListItem.Chevron size={25} />
        </ListItem>
      </KeyboardAwareScrollView>
      <Footer disabled={loader} title={groupParam ? 'Xác nhận' : 'Thêm nhóm'} onPress={submit} />
    </SafeAreaView>
  )
}
