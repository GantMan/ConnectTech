import React from 'react'
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/TwitterStyles'

const tweetWithHashtag = () => {
  const appURL = 'twitter://post?hashtags=ConnectTech2017'
  const webURL = 'https://twitter.com/intent/tweet?hashtags=ConnectTech2017'
  Linking.canOpenURL(appURL).then((supported) =>
    Linking.openURL(supported ? appURL : webURL)
  )
}

const Twitter = (props) => {
  return (
    <View>
      <Image source={Images.atlanta} style={styles.backgroundImage}>
        <View style={styles.twitter}>
          <View style={styles.headerImageContainer}>
            <Image source={Images.ctLogo} style={styles.headerImage} />
          </View>
          <Image style={styles.blowhorn} source={Images.blowhorn} />
          <TouchableOpacity onPress={() => tweetWithHashtag()}>
            <Text style={styles.heading}>
              #ConnectTech2017
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            Make your friends jealous by tweeting, posting,
            or whatever it is you do with the hashtag&nbsp;
            <Text style={styles.hashtag} onPress={() => tweetWithHashtag()}>
              #ConnectTech2017
            </Text>.
          </Text>
        </View>
      </Image>
    </View>
  )
}

export default Twitter
