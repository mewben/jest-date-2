import {differenceInMinutes} from 'date-fns'
import {checkDate, deriveRelativeDateMessage} from './utils'

declare global {
  namespace jest {
    interface Matchers<R, T> {
      /**
       * Assert whether a date is within a minute as another.
       * @param {Date} date - Date to compare to
       * @example
       * expect(new Date(2020, 8, 1, 12, 30)).toBeWithinMinuteAs(new Date(2020, 8, 1, 12, 30))
       */
      toBeWithinMinuteAs(date: Date): R
    }
  }
}

export function toBeWithinMinuteAs(
  this: jest.MatcherUtils,
  received: Date,
  expected: Date,
) {
  checkDate('received', received, toBeWithinMinuteAs, {invert: this.isNot})
  checkDate('expected', expected, toBeWithinMinuteAs, {invert: this.isNot})

  const messageContext = {
    name: toBeWithinMinuteAs.name,
    expected,
    received,
    invert: this.isNot,
  }

  return {
    pass: differenceInMinutes(received, expected) < 1,
    message: () => deriveRelativeDateMessage(messageContext),
  }
}
