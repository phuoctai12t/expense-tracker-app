import { Colors } from 'constant'

export default {
  getIcon: (iconName: string) => ({ type: 'MaterialIcons', name: iconName, color: Colors.primary }),
}
