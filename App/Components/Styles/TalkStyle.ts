import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Metrics.baseMargin / 2,
    marginHorizontal: Metrics.baseMargin
  },
  currentDay: {
    marginLeft: 16,
    marginRight: 24
  },
  active: {
    marginLeft: 6,
    marginRight: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowColor: Colors.redShadow,
    shadowOpacity: 1
  },
  finished: {
    opacity: 0.7
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
    borderRadius: Metrics.cardRadius,
    backgroundColor: Colors.snow
  },
  infoText: {
    flex: 1,
    paddingRight: Metrics.doubleBaseMargin
  },
  title: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 17,
    color: Colors.darkPurple,
    letterSpacing: 0
  },
  name: {
    fontFamily: Fonts.type.base,
    fontSize: 13,
    color: Colors.lightText,
    letterSpacing: 0,
    lineHeight: 18
  },
  location: {
    fontFamily: Fonts.type.base,
    fontSize: 12,
    color: '#7a7a7a',
    letterSpacing: 0,
    lineHeight: 18
  },
  avatar: {
    width: Metrics.images.avatar,
    height: Metrics.images.avatar,
    borderColor: Colors.avatarBorder,
    borderWidth: 1,
    borderRadius: Metrics.images.avatar / 2
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderBottomLeftRadius: Metrics.cardRadius,
    borderBottomRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.silver
  },
  details: {
    flexDirection: 'row'
  },
  detail: {
    paddingRight: Metrics.doubleBaseMargin
  },
  detailLabel: {
    fontFamily: Fonts.type.base,
    fontSize: 11,
    color: Colors.lightText,
    letterSpacing: 0
  },
  detailText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 11,
    color: Colors.darkPurple,
    letterSpacing: 0
  }
})
