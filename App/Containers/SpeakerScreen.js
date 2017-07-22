import React, { Component } from 'react'
import { AppState, View, Image, FlatList } from 'react-native'
import PurpleGradient from '../Components/PurpleGradient'
import DayToggle from '../Components/DayToggle'
import Speaker from '../Components/Speaker'
import Break from '../Components/Break'
import ScheduleActions, { getSpeakers } from '../Redux/ScheduleRedux'
import { connect } from 'react-redux'
import {
  compareAsc,
  isSameDay,
  addMinutes,
  isWithinRange,
  subMilliseconds
} from 'date-fns'
import {
  merge,
  groupWith,
  contains,
  assoc,
  map,
  sum,
  findIndex
} from 'ramda'
import NotificationActions from '../Redux/NotificationRedux'
import Config from '../Config/AppConfig'
import { Images } from '../Themes'
import styles from './Styles/ScheduleScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class SpeakerScreen extends Component {
  constructor (props) {
    super(props)
  }

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

  getEventsByDayFromSchedule = (schedule) => {
    const mergeTimes = (e) => {
      const eventDuration = Number(e.duration)
      const eventStart = new Date(e.time)
      const eventFinal = addMinutes(eventStart, eventDuration)
      // ends 1 millisecond before event
      const eventEnd = subMilliseconds(eventFinal, 1)

      return merge(e, { eventStart, eventEnd, eventDuration, eventFinal })
    }
    const sorted = [...schedule].map(mergeTimes).sort((a, b) => {
      return compareAsc(a.eventStart, b.eventStart)
    })
    return groupWith((a, b) => isSameDay(a.eventStart, b.eventStart), sorted)
  }

  onEventPress = (item) => {
    const { navigation, setSelectedEvent } = this.props
    setSelectedEvent(item)

    item.type === 'talk'
      ? navigation.navigate('TalkDetail')
      : navigation.navigate('BreakDetail')
  }

  componentDidMount () {
    console.tron.log(this.props.speakers)
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.getScheduleUpdates()
    }
    this.setState({appState: nextAppState})
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
    const { currentTime, setReminder, removeReminder } = this.props

    return (
      <Speaker
        name={item.bio}
        avatarURL={item.speakerPhoto || 'https://infinite.red/images/chainreact/gant.png'}
        description={item.name}
        onPress={() => this.onEventPress(null)}
        onPressTwitter={this.funcOrFalse(this.props.onPressTwitter, item.twitter)}
        onPressGithub={this.funcOrFalse(this.props.onPressGithub, item.github)}
      />
    )
  }

  render () {
    return (
      <PurpleGradient key='speakerGradient' style={styles.linearGradient}>
        <FlatList
          ref='speakerList'
          data={this.props.speakers}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item, idx) => item.name}
          contentContainerStyle={styles.listContent}
          getItemLayout={this.getItemLayout}
          showsVerticalScrollIndicator={false}
        />
      </PurpleGradient>
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
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
    onPressGithub: url => dispatch(ScheduleActions.visitGithub(url)),
    onPressTwitter: url => dispatch(ScheduleActions.visitTwitter(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerScreen)
