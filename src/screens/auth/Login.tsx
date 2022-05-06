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
import type { LoginParams } from 'typings'
import type { AuthStackScreenProps } from 'typings/navigation'

export default function Login({ navigation }: AuthStackScreenProps<'Login'>) {
  const [sending, setSending] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginParams>()
  const { login: loginStote } = useStore()

  const jumpToPassword = () => setFocus('password')
  const gotoSignUp = () => navigation.replace('SignUp')
  const goToForgotPassword = () => navigation.navigate('ForgotPassword')
  const toggleHidePassword = () => setHidePassword(!hidePassword)

  const login = handleSubmit(async ({ email, password }) => {
    setSending(true)
    const response = await authApi.login({ email: email.trim(), password })
    response.ok && response.data && (await loginStote(response.data.token))
    setSending(false)
  })

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <KeyboardAwareScrollView contentContainerStyle={Style.container}>
        <Text h3 style={styles.heading}>
          Đăng nhập
        </Text>

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
              autoFocus
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
              returnKeyType="done"
              rightIcon={
                <TouchableOpacity onPress={toggleHidePassword}>
                  <Icon name={hidePassword ? 'eye-off' : 'eye'} size={24} />
                </TouchableOpacity>
              }
              secureTextEntry={hidePassword}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={login}
            />
          )}
          rules={{
            required: 'Vui lòng nhập mật khẩu',
          }}
        />

        <Button
          containerStyle={Style.selfEnd}
          disabled={sending}
          title="Quên mật khẩu?"
          type="clear"
          onPress={goToForgotPassword}
        />
        <Button containerStyle={Style.my1} loading={sending} title="Đăng nhập" onPress={login} />
        <View style={[Style.rowCenter, Style.selfCenter]}>
          <Text>Chưa có tài khoản?</Text>
          <Button
            containerStyle={Style.selfEnd}
            disabled={sending}
            title="Đăng ký"
            type="clear"
            onPress={gotoSignUp}
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
