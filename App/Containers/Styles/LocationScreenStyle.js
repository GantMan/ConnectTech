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
    color: Colors.snow,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    textShadowColor: '#000'
  },
  address: {
    fontFamily: Fonts.type.medium,
    fontSize: 15,
    letterSpacing: 0.47,
    lineHeight: 23,
    paddingTop: 35,
    textAlign: 'center',
    color: Colors.lightPurple,
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 3,
    textShadowColor: '#000'
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
  },
  venueMap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: Colors.transparent
  },
  venueMapContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.snow
  },
  venueMapImage: {
    flexShrink: 1,
    width: 350,
    height: 370
  }
})
