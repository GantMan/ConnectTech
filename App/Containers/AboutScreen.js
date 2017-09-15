import React from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import BackgroundGradient from '../Components/BackgroundGradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Twitter from '../Components/Twitter'
import LiveHelp from '../Components/LiveHelp'
import { connect } from 'react-redux'
import styles from './Styles/AboutScreenStyle'

class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'General Info',
    tabBarIcon: ({ focused }) => (
      <Icon
        name='info-circle'
        size={25}
        color={
          focused
            ? '#fff'
            : '#ccf'
        }
      />
    )
  }

  render () {
    return (
      <BackgroundGradient style={[styles.linearGradient, {flex: 1}]}>
        <ScrollView>
          <View style={styles.container}>
            <Twitter />
            <View style={styles.tabsContainer}>
              <LiveHelp />
            </View>
          </View>
        </ScrollView>
      </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentTime: new Date(state.schedule.currentTime)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
