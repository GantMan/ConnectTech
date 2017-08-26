import React from 'react'
import { View, Text, Linking } from 'react-native'
import RoundedButton from './RoundedButton'
import ScheduleActions from '../Redux/ScheduleRedux.js'
import styles from './Styles/LiveHelpStyles'

const tweetWithMention = () => {
  const appURL = 'twitter://post?screen_name=connect_js'
  const webURL = 'https://twitter.com/intent/tweet?screen_name=connect_js'
  Linking.canOpenURL(appURL).then((supported) =>
    Linking.openURL(supported ? appURL : webURL)
  )
}

// TODO: Update phone number or refactor whole component.
const LiveHelp = (props) => {
  return (
    <View style={styles.liveHelp}>
      <Text style={styles.liveHelpPhone}>
        (360) 562-0450
      </Text>
      <Text style={styles.liveHelpText}>
        Message us at anytime for directions, suspicious activity,
        violations of our <Text style={styles.link} onPress={() => Linking.openURL('http://connect.tech/conduct.html')}>Code of Conduct</Text>, or any other concern.
      </Text>
      <RoundedButton
        text='Email: admin@connect.tech'
        onPress={() => Linking.openURL('mailto:admin@connect.tech')}
        style={styles.liveHelpButton}
      />
      <RoundedButton
        text='Tweet: @connect_js'
        onPress={tweetWithMention}
        style={styles.liveHelpButton}
      />
    </View>
  )
}

export default LiveHelp
