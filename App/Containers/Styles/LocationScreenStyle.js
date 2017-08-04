import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  mainHeading: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 31,
    letterSpacing: 0.2,
    color: Colors.snow
  },
  address: {
    fontFamily: Fonts.type.medium,
    fontSize: 15,
    letterSpacing: 0.47,
    lineHeight: 23,
    textAlign: 'center',
    color: Colors.lightPurple
  },
  map: {
    width: '100%',
    height: 180,
    zIndex: 2
  },
  mapActions: {
    paddingHorizontal: 12,
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      x: 10,
      y: 10
    },
    shadowOpacity: 0.3,
    zIndex: 1
  },
  getDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE'
  },
  venueName: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 17,
    letterSpacing: 0,
    color: Colors.darkPurple
  },
  venueAddress: {
    fontFamily: Fonts.type.base,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.lightText
  },
  addressContainer: {
    flex: 4
  },
  directionsIcon: {
    alignItems: 'center',
    flex: 1
  },
  directionsLabel: {
    fontFamily: Fonts.type.medium,
    fontSize: 11,
    letterSpacing: 0,
    color: Colors.darkPurple
  },
  getRide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  getRideLabel: {
    fontFamily: Fonts.type.medium,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.5,
    color: Colors.darkPurple
  },
  getRideIcon: {
    marginHorizontal: 10
  },
  rideButton: {
    margin: 1.2 * Metrics.smallMargin
  },
  rideOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#EDEDED'
  },
  flip: {
    transform: [{
      rotate: '180 deg'
    }]
  },
  nearby: {
    alignItems: 'center',
    paddingTop: 40
  }
})
