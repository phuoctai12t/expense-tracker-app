import { Button, Input, Text } from '@rneui/themed'
import { authApi } from 'api'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Style } from 'constant'
import { app, validation } from 'helpers'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useStore } from 'store'
import type { SignUpParams } from 'typings'
import type { AuthStackScreenProps } from 'typings/navigation'

type FormValues = SignUpParams & {
  confirmPassword: string
}

export default function SignUp({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const [sending, setSending] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<FormValues>()
  const { login } = useStore()

  const jumpToEmail = () => setFocus('email')
  const jumpToPassword = () => setFocus('password')
  const jumpToConfirmPassword = () => setFocus('confirmPassword')
  const toggleHidePassword = () => setHidePassword(!hidePassword)
  const toggleHideConfirmPassword = () => setHideConfirmPassword(!hideConfirmPassword)
  const gotoLogIn = () => navigation.replace('Login')

  const signUp = handleSubmit(async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Mật khẩu không khớp' })
      setFocus('confirmPassword')
      return
    }

    setSending(true)
    const response = await authApi.signUp({ name: name.trim(), email: email.trim(), password })
    if (response.ok) {
      response.data && (await login(response.data.token))
    } else if (response.data?.errors) {
      const errors = response.data.errors as FormValues
      for (const key in errors) {
        const _key = key as keyof FormValues
        setError(_key, { message: errors[_key] })
      }
    }
    setSending(false)
  })

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <KeyboardAwareScrollView contentContainerStyle={Style.container}>
        <Text h3 style={styles.heading}>
          Đăng ký
        </Text>

        {errors.name ? (
          <Text style={Style.textDanger}>{errors.name.message}</Text>
        ) : (
          <Text style={Style.label}>Họ và tên</Text>
        )}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              autoFocus
              autoCapitalize="words"
              editable={!sending}
              leftIcon={app.getIcon('person')}
              placeholder="Họ và tên"
              returnKeyType="next"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={jumpToEmail}
            />
          )}
          rules={{
            validate: value => validation.trim(value, 'Vui lòng nhập họ và tên'),
          }}
        />

        {errors.email ? (
          <Text style={Style.textDanger}>{errors.email.message}</Text>
        ) : (
          <Text style={Style.label}>Email</Text>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              autoCapitalize="none"
              editable={!sending}
              keyboardType="email-address"
              leftIcon={app.getIcon('mail')}
              placeholder="Email"
              returnKeyType="next"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value.toLowerCase())}
              onSubmitEditing={jumpToPassword}
            />
          )}
          rules={{
            validate: validation.email,
          }}
        />

        {errors.password ? (
          <Text style={Style.textDanger}>{errors.password.message}</Text>
        ) : (
          <Text style={Style.label}>Mật khẩu</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              autoCapitalize="none"
              editable={!sending}
              leftIcon={app.getIcon('lock')}
              placeholder="Mật khẩu"
              returnKeyType="next"
              rightIcon={
                <TouchableOpacity onPress={toggleHidePassword}>
                  <Icon name={hidePassword ? 'eye-off' : 'eye'} size={24} />
                </TouchableOpacity>
              }
              secureTextEntry={hidePassword}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={jumpToConfirmPassword}
            />
          )}
          rules={{
            required: 'Vui lòng nhập mật khẩu',
          }}
        />

        {errors.confirmPassword ? (
          <Text style={Style.textDanger}>{errors.confirmPassword.message}</Text>
        ) : (
          <Text style={Style.label}>Xác nhận mật khẩu</Text>
        )}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              autoCapitalize="none"
              editable={!sending}
              leftIcon={app.getIcon('lock')}
              placeholder="Xác nhận mật khẩu"
              returnKeyType="done"
              rightIcon={
                <TouchableOpacity onPress={toggleHideConfirmPassword}>
                  <Icon name={hideConfirmPassword ? 'eye-off' : 'eye'} size={24} />
                </TouchableOpacity>
              }
              secureTextEntry={hideConfirmPassword}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={signUp}
            />
          )}
        />

        <Button containerStyle={Style.my1} loading={sending} title="Đăng ký" onPress={signUp} />

        <View style={[Style.rowCenter, Style.selfCenter]}>
          <Text>Đã có tài khoản?</Text>
          <Button
            containerStyle={Style.selfEnd}
            disabled={sending}
            title="Đăng nhập"
            type="clear"
            onPress={gotoLogIn}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 50,
    textAlign: 'center',
  },
})
