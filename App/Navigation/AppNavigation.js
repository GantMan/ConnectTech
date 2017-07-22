import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import ScheduleScreen from '../Containers/ScheduleScreen'
import SpeakerScreen from '../Containers/SpeakerScreen'
import TalkDetailScreen from '../Containers/TalkDetailScreen'
import BreakDetailScreen from '../Containers/BreakDetailScreen'
import LocationScreen from '../Containers/LocationScreen'
import AboutScreen from '../Containers/AboutScreen'
import styles from './Styles/NavigationStyles'

const ScheduleStack = StackNavigator({
  Home: { screen: ScheduleScreen },
  TalkDetail: { screen: TalkDetailScreen },
  BreakDetail: { screen: BreakDetailScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card
})

const SpeakerStack = StackNavigator({
  Home: { screen: SpeakerScreen },
  TalkDetail: { screen: TalkDetailScreen },
  BreakDetail: { screen: BreakDetailScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card
})

const TabNav = TabNavigator({
  Schedule: { screen: ScheduleStack },
  Speaker: { screen: SpeakerStack },
  Location: { screen: LocationScreen },
  About: { screen: AboutScreen }
}, {
  key: 'Schedule',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  headerMode: 'none',
  initialRouteName: 'Speaker',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: 'white',
    inactiveTintColor: 'white'
  }
})

export default TabNav
