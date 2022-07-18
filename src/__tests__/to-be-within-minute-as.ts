import {addSeconds} from 'date-fns'
import {testMatcher, property} from '../test-utils'

const date = new Date()

testMatcher('toBeWithinMinuteAs', [
  property.passes('when date is within a minute', {
    expected: date,
    received: addSeconds(date, 59),
  }),
  property.fails('when date is not within a minute', {
    expected: date,
    received: addSeconds(date, 60),
  }),
  property.fails('when date is not within a minute', {
    expected: date,
    received: addSeconds(date, 61),
  }),
  property.expectedMustBeADate({received: new Date()}),
  property.receivedMustBeADate({expected: new Date()}),
])
