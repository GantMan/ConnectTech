import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backgroundImage: {
    height: 350,
    width: Metrics.screenWidth
  },
  heading: {
    marginTop: 14,
    fontFamily: Fonts.type.bold,
    fontSize: 31,
    letterSpacing: 0.2,
    backgroundColor: Colors.transparent,
    color: Colors.snow
  },
  headerImageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin
  },
  headerImage: {
    resizeMode: 'contain',
    flexShrink: 1
  },
  description: {
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    fontSize: 15,
    color: Colors.lightPurple,
    letterSpacing: 0.47,
    lineHeight: 23
  },
  hashtag: {
    fontFamily: Fonts.type.semiBold,
    color: Colors.snow
  },
  twitter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: Colors.transparent
  }
})
