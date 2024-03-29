import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  row: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginVertical: Metrics.smallMargin
  },
  sectionHeader: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.frost
  },
  label: {
    color: Colors.text
  },
  listContent: {
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin * 8
  },
  timeline: {
    width: 2,
    backgroundColor: Colors.mediumPurple,
    position: 'absolute',
    top: 85,
    bottom: 0,
    right: 11
  }
})
