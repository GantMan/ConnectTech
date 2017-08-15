import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  headerGradient: {
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    elevation: 20,
    backgroundColor: Colors.black
  },
  dayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Metrics.doubleBaseMargin,
    height: 85,
    backgroundColor: Colors.clear
  },
  inactiveDay: {
    backgroundColor: Colors.clear,
    fontFamily: Fonts.type.base,
    fontSize: 20,
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 0
  },
  activeDay: {
    backgroundColor: Colors.clear,
    fontFamily: Fonts.type.semiBold,
    fontSize: 20,
    color: Colors.snow,
    letterSpacing: 0
  }

})
