import React from 'react'
import { BackHandler, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import BackgroundGradient from '../Components/BackgroundGradient'
import SocialMediaButton from '../Components/SocialMediaButton'
import { NavigationActions } from 'react-navigation'
import ScheduleActions, { getTalks } from '../Redux/ScheduleRedux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
import styles from './Styles/TalkDetailScreenStyle'
import NotificationActions from '../Redux/NotificationRedux'

class TalkDetail extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeScheduleIcon : Images.inactiveScheduleIcon} />
    )
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.goBack)
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  renderSpeaker = (speaker) => {
    return (
      <View>
        <Text style={styles.heading}>
          {speaker.name}
        </Text>
        <Text style={styles.description}>
          {speaker.company}
        </Text>
        <Text style={styles.description}>
          {speaker.bio.replace(/<(?:.|\n)*?>/gm, '')}
        </Text>
        <View style={styles.social}>
          { speaker.twitter &&
            <SocialMediaButton
              network='twitter'
              spacing='right'
              onPress={() => this.props.onPressTwitter(speaker.twitter)}
            />
          }
          { speaker.github &&
            <SocialMediaButton
              network='github'
              spacing='right'
              onPress={() => this.props.onPressGithub(speaker.github)}
            />
          }
        </View>
      </View>
    )
  }

  renderTalk = (talk, index) => {
    return (
      <View key={index}>
        <Text style={styles.heading}>
          {talk.title}
        </Text>
        <Text style={styles.description}>
          {talk.description}
        </Text>
        <Text style={styles.description}>
          Time: {talk.time}
        </Text>
        <Text style={styles.description}>
          Location: {talk.room}
        </Text>
      </View>
    )
  }

  renderTalks = () => {
    const { talkInfo } = this.props
    return (talkInfo.map((talk, index) => this.renderTalk(talk, index)))
  }

  render () {
    return (
      <BackgroundGradient style={styles.linearGradient}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <Image style={styles.backButtonIcon} source={Images.arrowIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.cardShadow1} />
            <View style={styles.cardShadow2} />
            <Image
              style={styles.avatar}
              source={{uri: this.props.speaker.image}}
            />
            <View style={styles.card}>
              <Text style={styles.sectionHeading}>
                ABOUT
              </Text>
              {this.renderSpeaker(this.props.speaker)}
              <Text style={styles.sectionHeading}>
                TALKS
              </Text>
              { this.renderTalks() }
            </View>
          </View>
        </ScrollView>
      </BackgroundGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    speaker: state.schedule.selectedSpeaker,
    talkInfo: getTalks(state.schedule.selectedSpeaker.name, state.schedule.speakerSchedule)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressGithub: url => dispatch(ScheduleActions.visitGithub(url)),
    onPressTwitter: url => dispatch(ScheduleActions.visitTwitter(url)),
    setReminder: title => dispatch(NotificationActions.addTalk(title)),
    removeReminder: title => dispatch(NotificationActions.removeTalk(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail)
