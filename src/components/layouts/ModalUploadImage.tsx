import * as ImagePicker from 'expo-image-picker'
import { toast } from 'helpers'
import React from 'react'
import { Platform } from 'react-native'
import ModalSelector, { IOption, ModalSelectorProps } from 'react-native-modal-selector'

const opitons: IOption[] = [
  { key: 'camera', label: 'Chụp ảnh' },
  { key: 'library', label: 'Chọn ảnh từ thư viện' },
]

export default function ModalUploadImage({
  children,
  onConfirm,
  imagePickerProps,
  ...others
}: Partial<ModalSelectorProps> & {
  children: React.ReactNode
  onConfirm: (image: string) => void
  imagePickerProps?: ImagePicker.ImagePickerOptions
  multiple?: boolean
}) {
  const pickImageFromLibrary = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          toast.goToSetting('media')
        } else {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            presentationStyle: 0,
            ...imagePickerProps,
          })
          if (!result.cancelled) {
            onConfirm(result.uri)
          }
        }
      }
    } catch (error) {}
  }

  return (
    <ModalSelector
      backdropPressToClose
      data={opitons}
      onChange={async option => {
        if (option.key === 'library') {
          if (Platform.OS === 'ios') {
            setTimeout(() => {
              pickImageFromLibrary()
            }, 1000)
          } else {
            pickImageFromLibrary()
          }
        } else if (option.key === 'camera') {
          const { status } = await ImagePicker.requestCameraPermissionsAsync()
          if (status !== 'granted') {
            toast.goToSetting('camera')
          } else {
            const result = await ImagePicker.launchCameraAsync()
            !result.cancelled && onConfirm(result.uri)
          }
        }
      }}
      {...(others as any)}
    >
      {children}
    </ModalSelector>
  )
}
