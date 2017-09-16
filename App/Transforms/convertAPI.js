import _ from 'lodash'
import moment from 'moment'

const jsonEscape = str =>
  str
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/\t/g, '')

const scheduleGen = (file) => {
  var schedule = []
  _.each(file.schedule.conference.days, (d) => {
    _.each(d.rooms, (r, k) => {
      _.each(r, (session) => {
        let s = transformSession(session)
        schedule.push(s)
      })
    })
  })

  return schedule
}

const transformSession = (s) => {
  var speakerData = []
  var timeStart = moment(s.date).format('MM/DD/YYYY hh:mm A')
  var speakerNames = _.map(s.persons, (p) => {
    return p.full_public_name
  })
  speakerNames = speakerNames.join(',')

  _.each(s.persons, (p) => {
    speakerData.push({
      name: p.full_public_name,
      image: 'http://cfp.connect-js.com' + p.avatar_path,
      twitter: p.twitter_name,
      bio: p.abstract
    })
  })
  var duration = moment.duration(s.duration).asMinutes()
  var typeOfsession = 'talk'
  if (s.type === 'lecture' || s.type === 'workshop') {
    typeOfsession = 'talk'
  } else if (s.title.indexOf('Lunch') >= 0) {
    typeOfsession = 'lunch'
  } else if (s.title.indexOf('Break') >= 0) {
    typeOfsession = 'coffee'
  } else if (s.title.indexOf('Reception') >= 0) {
    typeOfsession = 'party'
  } else if (s.title.indexOf('Party') >= 0) {
    typeOfsession = 'party'
  }

  return {
    title: s.title,
    location: s.room,
    description: s.abstract,
    speaker: speakerNames,
    time: timeStart,
    duration: duration,
    speakerInfo: speakerData,
    type: typeOfsession,
    room: s.track
  }
}

export default (inboundJSON) => {
  const inboundClean = jsonEscape(inboundJSON)
  const container = {
    schedule: scheduleGen(inboundClean)
  }

  return container
}
