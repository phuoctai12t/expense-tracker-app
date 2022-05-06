import { Button, Icon, ListItem, Text } from '@rneui/themed'
import { SafeAreaView } from 'components/layouts'
import { Colors, Style } from 'constant'
import * as FileSystem from 'expo-file-system'
import * as Notifications from 'expo-notifications'
import { date, toast } from 'helpers'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default function ExportStatistic() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false)
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const showStartDatePicker = () => setStartDatePickerVisible(true)
  const hideStartDatePicker = () => setStartDatePickerVisible(false)
  const onConfirmSelectStartDate = (date: Date) => {
    hideStartDatePicker()
    setStartDate(date)
  }

  const showEndDatePicker = () => setEndDatePickerVisible(true)
  const hideEndDatePicker = () => setEndDatePickerVisible(false)
  const onConfirmSelectEndDate = (date: Date) => {
    hideEndDatePicker()
    setEndDate(date)
  }

  const submit = async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (!permissions.granted) {
      alert('Bạn cần chọn thư mục để lưu file này')
      return
    }

    const downloadUri = 'https://www.orimi.com/pdf-test.pdf'
    const fileName = 'pdf'
    const fileUri = FileSystem.documentDirectory + fileName + '.pdf'
    setDownloading(true)
    try {
      const response = await FileSystem.downloadAsync(downloadUri, fileUri)
      const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/pdf'
      )
      const base64 = await FileSystem.readAsStringAsync(response.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      await FileSystem.writeAsStringAsync(newUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })
      Notifications.scheduleNotificationAsync({
        content: {
          title: fileName,
          body: 'Đã tải xuống thành công',
        },
        trigger: null,
      })
    } catch (e) {
      toast.error('Lỗi khi tải xuống')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <DateTimePickerModal
        date={startDate}
        isVisible={isStartDatePickerVisible}
        locale="vi"
        mode="date"
        onCancel={hideStartDatePicker}
        onConfirm={onConfirmSelectStartDate}
      />
      <DateTimePickerModal
        date={endDate}
        isVisible={isEndDatePickerVisible}
        locale="vi"
        mode="date"
        onCancel={hideEndDatePicker}
        onConfirm={onConfirmSelectEndDate}
      />

      <ScrollView contentContainerStyle={Style.container}>
        <Text style={[Style.label, Style.mb]}>Thời gian bắt đầu</Text>
        <ListItem style={Style.mb1} onPress={showStartDatePicker}>
          <Icon color={Colors.primary} name="calendar-today" />
          <ListItem.Content>
            <ListItem.Title>
              {date.format(startDate)}
              {date.isToday(startDate) ? ' (Hôm nay)' : ''}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <Text style={[Style.label, Style.mb]}>Thời gian kết thúc</Text>
        <ListItem style={Style.mb1} onPress={showEndDatePicker}>
          <Icon color={Colors.primary} name="calendar-today" />
          <ListItem.Content>
            <ListItem.Title>
              {date.format(endDate)}
              {date.isToday(endDate) ? ' (Hôm nay)' : ''}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <Button
          disabled={downloading}
          title={downloading ? 'Đang tải xuống...' : 'Xuất thống kê'}
          onPress={submit}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
