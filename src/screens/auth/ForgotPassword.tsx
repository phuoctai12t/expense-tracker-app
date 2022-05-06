import { Input, Text } from '@rneui/themed'
import { authApi } from 'api'
import { Footer } from 'components/common'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Style } from 'constant'
import { app, validation } from 'helpers'
import { usePreventGoBack } from 'hooks'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ForgotPasswordParams } from 'typings'
import { AuthStackScreenProps } from 'typings/navigation'

export default function ForgotPassword({ navigation }: AuthStackScreenProps<'ForgotPassword'>) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ForgotPasswordParams>()
  const [sending, setSending] = useState(false)

  usePreventGoBack(sending)

  const next = handleSubmit(async ({ email }) => {
    setSending(true)
    const response = await authApi.forgotPassword({ email: email.trim() })
    if (response.ok) {
      navigation.navigate('ConfirmCode', { email })
    } else if (response.data?.errors) {
      setError('email', { message: response.data.errors.email })
    }
    setSending(false)
  })

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView
        contentContainerStyle={Style.container}
        showsVerticalScrollIndicator={false}
      >
        {errors.email ? (
          <Text style={Style.textDanger}>{errors.email.message}</Text>
        ) : (
          <Text style={Style.label}>Nhập email của bạn</Text>
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
              leftIcon={app.getIcon('email')}
              placeholder="Email"
              returnKeyType="next"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value.toLowerCase())}
              onSubmitEditing={next}
            />
          )}
          rules={{
            validate: validation.email,
          }}
        />
      </KeyboardAwareScrollView>
      <Footer loading={sending} onPress={next} />
    </SafeAreaView>
  )
}
