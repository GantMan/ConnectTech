import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, LayoutAnimation, Animated } from 'react-native'
import TalkInfo from './TalkInfo'
import TimeIndicator from './TimeIndicator'
import styles from './Styles/SpeakerStyle'
import PushNotification from 'react-native-push-notification'
import PNHelpers from '../Lib/PushNotificationHelpers'
import SBHelper from '../Lib/SpecialButtonHelper'
import FadeIn from 'react-native-fade-in-image'

interface TalkProps {
  name: string
  description: string
  avatarURL: string
  onPress (): void
  onPressTwitter (): void
  onPressGithub (): void
}

interface TalkState {
  animatedSize: Animated.Value
}

export default class Speaker extends React.Component<TalkProps, TalkState> {
  constructor (props) {
    super(props)

    this.state = {
      animatedSize: new Animated.Value(1)
    }
  }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true
    }).start()
  }

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start()
  }

  render () {
    const {
      name,
      description,
      avatarURL
    } = this.props

    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }]
    }

    const containerStyles = [
      styles.container,
      animatedStyle
    ]

    return (
      <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={this.props.onPress}
      >
          <Animated.View style={containerStyles}>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <FadeIn>
              <Image style={styles.avatar} source={{uri: avatarURL}} />
            </FadeIn>
          </View>
          </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
