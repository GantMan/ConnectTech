import React, { Component } from 'react'
import { AppState, View, SectionList, Text } from 'react-native'
import BackgroundGradient from '../Components/BackgroundGradient'
import DayToggle from '../Components/DayToggle'
import Talk from '../Components/Talk'
import Break from '../Components/Break'
import ScheduleActions from '../Redux/ScheduleRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
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
  findIndex,
  groupBy,
  prop,
  reduce,
  keys
} from 'ramda'
import NotificationActions from '../Redux/NotificationRedux'
import Config from '../Config/AppConfig'
import styles from './Styles/ScheduleScreenStyle'

const isActiveCurrentDay = (currentTime, activeDay) =>
  isSameDay(currentTime, new Date(Config.conferenceDates[activeDay]))

const addSpecials = (specialTalksList, talks) =>
  map((talk) => assoc('special', contains(talk.title, specialTalksList), talk), talks)

const groupByTimes = groupBy(prop('time'))

class ScheduleScreen extends Component {
  constructor (props) {
    super(props)
    const { schedule, specialTalks, currentTime } = props
    const eventsByDay = this.getEventsByDayFromSchedule(schedule)
    const activeDay = 0
    const events = groupByTimes(addSpecials(specialTalks, eventsByDay[activeDay]))
    // format data to fit sections
    const data = reduce((acc, value) => {
      let dataFriendly = {}
      dataFriendly.key = value
      dataFriendly.data = events[value]
      acc.push(dataFriendly)
      return acc
    }, [], keys(events))
    const isCurrentDay = isActiveCurrentDay(currentTime, activeDay)
    const appState = AppState.currentState

    this.state = {eventsByDay, data, isCurrentDay, activeDay, appState}
  }

  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <Icon
        name='calendar'
        size={25}
        color={
          focused
            ? '#fff'
            : '#ccf'
        }
      />
    )
  }

  renderSectionHeader ({section}) {
    return <View style={styles.sectionHeader}><Text style={styles.boldLabel}>{section.key}</Text></View>
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
    AppState.addEventListener('change', this._handleAppStateChange)

    // Scroll to logic removed for now
    // const { data } = this.state
    // const index = this.getActiveIndex(data)
    // // fixes https://github.com/facebook/react-native/issues/13202
    // const wait = new Promise((resolve) => setTimeout(resolve, 200))
    // wait.then(() => {
    //   this.refs.scheduleList.scrollToIndex({index, animated: false})
    // })
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

  // componentWillReceiveProps (newProps) {
  //   const { activeDay, eventsByDay } = this.state
  //   const { specialTalks, currentTime, schedule } = newProps

  //   // Update currentTime before updating data
  //   if (currentTime) {
  //     this.setState({ currentTime }, () => {
  //       this.setState({
  //         data: addSpecials(specialTalks, eventsByDay[activeDay]),
  //         eventsByDay: this.getEventsByDayFromSchedule(schedule),
  //         isCurrentDay: isActiveCurrentDay(currentTime, activeDay)
  //       })
  //     })
  //   }
  // }

  // getActiveIndex = (data) => {
  //   const { currentTime } = this.props
  //   const foundIndex = findIndex((i) => isWithinRange(currentTime, i.eventStart, i.eventEnd))(data)

  //   // handle pre-event and overscroll
  //   if (foundIndex < 0) {
  //     return 0
  //   } else if (foundIndex > data.length - 3) {
  //     return data.length - 3
  //   } else {
  //     return foundIndex
  //   }
  // }

  setActiveDay = (activeDay) => {
    const { eventsByDay } = this.state
    const { currentTime, specialTalks } = this.props
    const events = groupByTimes(addSpecials(specialTalks, eventsByDay[activeDay]))
    // format data to fit sections
    const data = reduce((acc, value) => {
      let dataFriendly = {}
      dataFriendly.key = value
      dataFriendly.data = events[value]
      acc.push(dataFriendly)
      return acc
    }, [], keys(events))
    const isCurrentDay = isActiveCurrentDay(currentTime, activeDay)

    this.setState({data, activeDay, isCurrentDay}, () => {
      // if (isCurrentDay) {
        // Scroll to active
        // const index = this.getActiveIndex(data)
        // this.refs.scheduleList.scrollToIndex({index, animated: false})
      // } else {
        // Scroll to top
        // this.refs.scheduleList.scrollToOffset({y: 0, animated: false})
      // }
    })
  }

  // getItemLayout = (data, index) => {
  //   const item = data[index]
  //   const itemLength = (item, index) => {
  //     if (item && item.type === 'talk') {
  //       // use best guess for variable height rows
  //       return 138 + (1.002936 * item.title.length + 6.77378)
  //     } else {
  //       return 145
  //     }
  //   }
  //   const length = itemLength(item)
  //   const offset = sum(data.slice(0, index).map(itemLength))
  //   return { length, offset, index }
  // }

  // if value exists, create the function calling it, otherwise false
  funcOrFalse = (func, val) => val ? () => func.call(this, val) : false

  renderItem = ({item}) => {
    const { isCurrentDay } = this.state
    const { currentTime, setReminder, removeReminder } = this.props
    const { eventDuration, eventStart, eventEnd, eventFinal, special } = item
    const isActive = isWithinRange(currentTime, eventStart, eventEnd)
    const isFinished = currentTime > eventEnd

    if (item.type === 'talk') {
      return (
        <Talk
          type={item.type}
          name={item.speaker}
          avatarURL={`https://infinite.red/images/chainreact/${item.image}.png`}
          title={item.title}
          start={eventStart}
          duration={eventDuration}
          onPress={() => this.onEventPress(item)}
          onPressTwitter={this.funcOrFalse(this.props.onPressTwitter, item.speakerInfo[0].twitter)}
          onPressGithub={this.funcOrFalse(this.props.onPressGithub, item.speakerInfo[0].github)}
          setReminder={() => setReminder(item.title)}
          removeReminder={() => removeReminder(item.title)}
          currentTime={currentTime}
          isCurrentDay={isCurrentDay}
          isActive={isActive}
          isSpecial={special}
          isFinished={isFinished}
          showWhenFinished
        />
      )
    } else {
      return (
        <Break
          type={item.type}
          title={item.title}
          start={eventStart}
          end={eventFinal}
          duration={eventDuration}
          onPress={() => this.onEventPress(item)}
          currentTime={currentTime}
          isCurrentDay={isCurrentDay}
          isActive={isActive}
        />
      )
    }
  }

  render () {
    const { isCurrentDay, activeDay, data } = this.state
    return (
      <BackgroundGradient style={styles.linearGradient}>
        <DayToggle
          activeDay={activeDay}
          onPressIn={this.setActiveDay}
        />
        <SectionList
          ref='scheduleList'
          renderSectionHeader={this.renderSectionHeader}
          sections={data}
          renderItem={this.renderItem}
          keyExtractor={(item, idx) => idx}
          contentContainerStyle={styles.listContent}
        />

      </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentTime: new Date(state.schedule.currentTime),
    schedule: state.schedule.speakerSchedule,
    specialTalks: state.notifications.specialTalks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleUpdates: () => dispatch(ScheduleActions.getScheduleUpdates()),
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
    onPressGithub: url => dispatch(ScheduleActions.visitGithub(url)),
    onPressTwitter: url => dispatch(ScheduleActions.visitTwitter(url)),
    setReminder: title => dispatch(NotificationActions.addTalk(title)),
    removeReminder: title => dispatch(NotificationActions.removeTalk(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen)
