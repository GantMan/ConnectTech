import { call, put } from 'redux-saga/effects'
import ScheduleActions from '../Redux/ScheduleRedux'
// import convertAPI from '../Transforms/convertAPI'

export function * getScheduleUpdates (api, action) {
  let response = yield call(api.getSpeakers)
  if (response.ok) {
    // Nolonger need to transform
    // const convertedScheduled = call(convertAPI(response.data.schedule))
    yield put(ScheduleActions.updateSchedule(response.data.schedule))
  }
}
