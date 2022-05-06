import { Text } from '@rneui/themed'
import { Footer } from 'components/common'
import { KeyboardAwareScrollView, SafeAreaView } from 'components/layouts'
import { Colors, Layout, Style } from 'constant'
import { toast } from 'helpers'
import { usePreventGoBack } from 'hooks'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import type { AuthStackScreenProps } from 'typings/navigation'

const MAX_INPUT_SIZE = 60
const CELL_COUNT = 6
const tempInputSize = (Layout.width - Layout.gap * 2 - CELL_COUNT * 8) / CELL_COUNT
const INPUT_SIZE = tempInputSize < MAX_INPUT_SIZE ? tempInputSize : MAX_INPUT_SIZE

export default function ConfirmCode({ route }: AuthStackScreenProps<'ConfirmCode'>) {
  const { email } = route.params
  const [code, setCode] = useState('')
  const [sending, setSending] = useState(false)
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })

  usePreventGoBack(sending)

  const verifyCode = async () => {
    setSending(true)
    try {
      // TODO: verify code api
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      toast.error(error)
    }
    setSending(false)
  }

  const onBlur = () => code.length === CELL_COUNT && verifyCode()

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView
        contentContainerStyle={Style.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={Style.mb1}>
          Nhập mã code được gửi đến email <Text style={Style.textPrimary}>{email}</Text>
        </Text>

        <CodeField
          ref={ref}
          autoFocus
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
          textContentType="oneTimeCode"
          value={code}
          onBlur={onBlur}
          onChangeText={setCode}
        />
      </KeyboardAwareScrollView>
      <Footer
        disabled={code.length < CELL_COUNT}
        loading={sending}
        title="Xác nhận"
        onPress={verifyCode}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cell: {
    ...Style.borderRadius,
    ...Style.mb1,
    ...Style.textBold,
    backgroundColor: '#F8F8F8',
    borderColor: Colors.gray4,
    borderWidth: 1,
    color: Colors.gray1,
    fontSize: 18,
    height: INPUT_SIZE,
    justifyContent: 'center',
    lineHeight: INPUT_SIZE,
    marginBottom: 80,
    marginHorizontal: 4,
    overflow: 'hidden',
    textAlign: 'center',
    width: INPUT_SIZE,
  },
  focusCell: {
    borderColor: '#000',
  },
})
