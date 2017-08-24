import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './Styles/SocialMediaButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

// Example
ExamplesRegistry.addComponentExample('SocialMediaButton', () =>
  <SocialMediaButton
    network='twitter'
    onPress={() => window.alert('Lets Get Social AF')}
  />
)

interface SocialMediaButtonProps {
  style?: StyleSheet
  network: 'twitter' | 'github'
  spacing?: 'left' | 'right'
  onPress (): void
}

const SocialMediaButton = (props: SocialMediaButtonProps) => {
  const { network, style, spacing, onPress } = props
  const spacingShim = spacing === 'right' ? 'right' : 'left'

  return (
    <TouchableOpacity
      style={[styles[spacingShim], style]}
      onPress={onPress}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <Icon
        name={network}
        size={37}
        color={Colors.red}
      />
    </TouchableOpacity>
  )
}

export default SocialMediaButton
