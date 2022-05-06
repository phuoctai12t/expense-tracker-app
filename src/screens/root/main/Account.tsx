import Icon from '@expo/vector-icons/FontAwesome'
import { Button, Text, Input } from '@rneui/themed'
import { userApi } from 'api'
import { KeyboardAwareScrollView, ModalUploadImage } from 'components/layouts'
import { Colors, GlobalData, Layout, Style } from 'constant'
import { toast } from 'helpers'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, StyleSheet, TouchableOpacity, View, Modal } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import IconEye from 'react-native-vector-icons/Ionicons'
import { useStore } from 'store'
import { ChangePasswordParams } from 'typings'
import type { RootStackScreenProps } from 'typings/navigation'

const styles = StyleSheet.create({
  avatar: {
    ...Style.border,
    aspectRatio: 1,
    borderRadius: Layout.width * 0.3,
    height: Layout.width * 0.3,
  },
  btnSave: {
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    ...Style.mx,
    ...Style.borderRadius,
    ...Style.mb1,
  },
  cancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
  },
  containerAvatar: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  content: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  contentCtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 19,
    ...Style.shadow,
    ...Style.mx,
  },
  editIcon: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
  label: {
    color: Colors.gray2,
    fontSize: 16,
  },
  lastContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modal: {
    backgroundColor: 'rgba(52,52,52,0.8)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    height: 400,
    justifyContent: 'center',
    marginTop: '50%',
    paddingHorizontal: Layout.gap,
    width: '90%',
  },
  subContent: {
    ...Style.textBlack,
    fontFamily: 'medium',
    fontSize: 16,
  },
  title: {
    color: Colors.gray2,
    fontSize: 16,
  },
})

export default function Account({ navigation }: RootStackScreenProps<'Account'>) {
  const { logout, userData } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRePassword, setHideRePassword] = useState(true)

  const updateAvatar = () => {
    // TODO
  }

  const toggleHidePassword = () => setHidePassword(!hidePassword)
  const toggleHideRePassword = () => setHideRePassword(!hideRePassword)

  const onLogout = () =>
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đồng ý', onPress: logout },
    ])

  const changePassword = () => {
    setShowModal(true)
  }

  const cancel = () => {
    setShowModal(false)
  }

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ChangePasswordParams>()

  const save = handleSubmit(async ({ oldPassword, password }) => {
    setSending(true)
    const response = await userApi.changePassword({ oldPassword, password })
    if (response.ok && response.data) {
      toast.success('Đổi mật khẩu thành công.')
      setShowModal(false)
      reset()
      setHidePassword(true)
      setHideRePassword(true)
    }
    setSending(false)
  })

  const avatar = userData.avatar ? { uri: userData.avatar } : GlobalData.defaultAvatar

  return (
    <ScrollView>
      <ModalUploadImage onConfirm={updateAvatar}>
        <View style={styles.containerAvatar}>
          <Image resizeMode="cover" source={avatar} style={styles.avatar} />
          <Icon color={Colors.black} name="edit" size={25} style={styles.editIcon} />
        </View>
      </ModalUploadImage>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal)
        }}
      >
        <View style={styles.modal}>
          <KeyboardAwareScrollView contentContainerStyle={styles.modalContainer}>
            {errors.oldPassword ? (
              <Text style={Style.textDanger}>{errors.oldPassword.message}</Text>
            ) : (
              <Text style={Style.label}>Mật khẩu cũ:</Text>
            )}
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  ref={ref}
                  autoFocus
                  autoCapitalize="none"
                  editable={!sending}
                  labelStyle={styles.label}
                  placeholder="Nhập mật khẩu cũ"
                  returnKeyType="next"
                  rightIcon={
                    <TouchableOpacity onPress={toggleHidePassword}>
                      <IconEye name={hidePassword ? 'eye-off' : 'eye'} size={24} />
                    </TouchableOpacity>
                  }
                  secureTextEntry={hidePassword}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('password')}
                />
              )}
              rules={{
                required: 'Vui lòng nhập mật khẩu cũ',
              }}
            />

            {errors.password ? (
              <Text style={Style.textDanger}>{errors.password.message}</Text>
            ) : (
              <Text style={Style.label}>Mật khẩu mới:</Text>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  ref={ref}
                  autoCapitalize="none"
                  editable={!sending}
                  labelStyle={styles.label}
                  placeholder="Nhập mật khẩu mới"
                  returnKeyType="done"
                  rightIcon={
                    <TouchableOpacity onPress={toggleHideRePassword}>
                      <IconEye name={hideRePassword ? 'eye-off' : 'eye'} size={24} />
                    </TouchableOpacity>
                  }
                  secureTextEntry={hideRePassword}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              rules={{
                required: 'Vui lòng nhập mật khẩu mới',
              }}
            />

            <Button loading={sending} style={styles.btnSave} title="Lưu" onPress={save} />
            <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
              <Text style={styles.subContent}>Huỷ</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      <View>
        <View style={styles.contentCtn}>
          <View style={styles.content}>
            <Text style={styles.title}>Họ tên: </Text>
            <Text style={styles.subContent}>{userData.name}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Email: </Text>
            <Text style={styles.subContent}>{userData.email}</Text>
          </View>

          <TouchableOpacity style={styles.lastContent} onPress={changePassword}>
            <Text>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Button title="Chỉnh sửa" onPress={() => navigation.navigate('EditProfile')} />
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Đăng xuất" onPress={onLogout} />
      </View>
    </ScrollView>
  )
}
