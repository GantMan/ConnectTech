import {Platform} from 'react-native'

const colors = {
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  eggplant: '#251a34',
  border: '#483F53',
  banner: '#5F3E63',

  snow: 'white',
  // Now both red and redShadow are mustard
  red: '#f0ba33',
  redShadow: '#f0ba33',
  silver: '#F3F5F6',
  // Actually charcoal
  purple: '#312e3b',
  // Actually dark slate grey (tinged blue)
  darkPurple: '#1F1B2C',
  // Actually lighter version of dark slate grey
  purpleShadow1: '#504C5F',
  // Actually lighter version of purpleShadow1
  purpleShadow2: '#6E697E',
  // Change to use same as darkPurple
  headerPurple: '#312e3b',
  avatarBorder: '#DCE3E8',
  lightText: '#656565',
  text: '#000000',
  transparentBump: (Platform.OS === 'ios') ? 'rgba(49, 46, 59, 0.5)' : 'rgba(49, 46, 59, 0.9)',
  black: 'black',
  // Now a lighter version of purpleShadow2
  lightPurple: '#E1E0E2',
  // slightly darker than lightPurple is #B5B3BB
  lightYellow: 'rgba(253,229,255,0.5)',
  // Same as purple
  mediumPurple: '#312e3b'
}

export default colors
