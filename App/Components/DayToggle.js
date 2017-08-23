import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './Styles/DayToggleStyle'
import { Colors } from '../Themes/'

const DayToggle = props => {
  const { activeDay, onPressIn } = props
  const dayStyle = (day) =>
    activeDay === day ? styles.activeDay : styles.inactiveDay

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.0, 0.38, 1.0]}
      colors={[Colors.darkPurple, Colors.purple, Colors.purpleShadow1]}
      style={styles.headerGradient}>
      <View style={styles.dayToggle}>
        <TouchableOpacity onPressIn={() => onPressIn(0)}>
          <Text style={dayStyle(0)}>Weds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => onPressIn(1)}>
          <Text style={dayStyle(1)}>Thurs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => onPressIn(2)}>
          <Text style={dayStyle(2)}>Fri</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default DayToggle
