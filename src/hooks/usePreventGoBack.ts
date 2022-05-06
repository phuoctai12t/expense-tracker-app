import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export default function usePreventGoBack(loading: boolean) {
  const navigation = useNavigation()

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!loading) return
        e.preventDefault()
      }),
    [navigation, loading]
  )

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !loading })
  }, [loading])
}
