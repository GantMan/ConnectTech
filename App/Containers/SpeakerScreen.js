import React, { Component } from 'react'
import { AppState, FlatList } from 'react-native'
import BackgroundGradient from '../Components/BackgroundGradient'
import Speaker from '../Components/Speaker'
import ScheduleActions, { getSpeakers } from '../Redux/ScheduleRedux'
import { connect } from 'react-redux'
import { sum } from 'ramda'
import styles from './Styles/ScheduleScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class SpeakerScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Speakers',
    tabBarIcon: ({ focused }) => (
      <Icon
        name='users'
        size={25}
        color={
          focused
            ? '#fff'
            : '#ccf'
        }
      />
    )
  }

  onSpeakerPress = (item) => {
    const { navigation, setSelectedSpeaker } = this.props
    // setSelectedEvent(item)
    setSelectedSpeaker(item)

    navigation.navigate('SpeakerDetail')
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state) {
      const { appState } = this.state
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        this.props.getScheduleUpdates()
      }
      this.setState({appState: nextAppState})
    }
  }

  getItemLayout = (data, index) => {
    const item = data[index]
    const itemLength = (item, index) => {
      if (item.type === 'talk') {
        // use best guess for variable height rows
        return 138 + (1.002936 * item.title.length + 6.77378)
      } else {
        return 145
      }
    }
    const length = itemLength(item)
    const offset = sum(data.slice(0, index).map(itemLength))
    return { length, offset, index }
  }

  // if value exists, create the function calling it, otherwise false
  funcOrFalse = (func, val) => val ? () => func.call(this, val) : false

  renderItem = ({item}) => {
    return (
      <Speaker
        name={item.bio}
        avatarURL={item.image || item.speakerInfo[0].image || 'https://infinite.red/images/chainreact/gant.png'}
        description={item.name}
        onPress={() => this.onSpeakerPress(item)}
      />
    )
  }

  render () {
    return (
      <BackgroundGradient key='speakerGradient' style={styles.linearGradient}>
        <FlatList
          ref='speakerList'
          data={this.props.speakers}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item, idx) => idx}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule.speakerSchedule,
    specialTalks: state.notifications.specialTalks,
    speakers: getSpeakers(state.schedule.speakerSchedule)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleUpdates: () => dispatch(ScheduleActions.getScheduleUpdates()),
    setSelectedSpeaker: data => dispatch(ScheduleActions.setSelectedSpeaker(data)),
    onPressGithub: url => dispatch(ScheduleActions.visitGithub(url)),
    onPressTwitter: url => dispatch(ScheduleActions.visitTwitter(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerScreen)
