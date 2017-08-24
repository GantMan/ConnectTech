import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../Themes'
import styles from './Styles/RemindMeButtonStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

interface RemindMeProps {
  on: boolean
  onPress (): void
}

const RemindMeButton = (props: RemindMeProps) => {
  const { on, onPress } = props
  const buttonText = on ? 'Turn Off' : 'Remind Me'

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, on && styles.activeButton]}>
        <Icon
          name={ on ? 'bell-slash' : 'bell-o' }
          size={15}
          color={ on ? '#fff' : Colors.red }
          style={styles.icon}
        />
        <Text style={[styles.text, on && styles.activeText]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default RemindMeButton
