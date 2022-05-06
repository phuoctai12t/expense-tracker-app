import { Button, Input, Text } from '@rneui/themed'
import { userApi } from 'api'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Colors, Layout, Style } from 'constant'
import { toast, validation } from 'helpers'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { useStore } from 'store'
import { EditUserParams } from 'typings'
import { RootStackScreenProps } from 'typings/navigation'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.gap,
    paddingVertical: 20,
  },
  label: {
    color: Colors.gray2,
    fontSize: 16,
  },
})

export default function EditProfile({ navigation }: RootStackScreenProps<'EditProfile'>) {
  const { userData, setUserData } = useStore()
  const [sending, setSending] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserParams>({ defaultValues: userData })

  const save = handleSubmit(async ({ name }) => {
    setSending(true)
    const response = await userApi.edit({ name: name.trim() })
    if (response.ok && response.data) {
      toast.success('Chỉnh sửa thành công.')
      setUserData(response.data)
      navigation.pop()
    }
    setSending(false)
  })

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {errors.name ? (
          <Text style={Style.textDanger}>{errors.name.message}</Text>
        ) : (
          <Text style={Style.label}>Họ tên</Text>
        )}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              autoFocus
              autoCapitalize="words"
              editable={!sending}
              labelStyle={styles.label}
              placeholder="Nhập họ và tên"
              returnKeyType="next"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          rules={{
            validate: value => validation.trim(value, 'Vui lòng nhập họ tên'),
          }}
        />

        <Button containerStyle={Style.my1} loading={sending} title="Lưu" onPress={save} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
