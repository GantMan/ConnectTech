import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  heading: {
    marginTop: 14,
    fontFamily: Fonts.type.bold,
    fontSize: 31,
    letterSpacing: 0.2,
    backgroundColor: Colors.transparent,
    color: Colors.snow
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
