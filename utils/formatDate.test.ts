import each from 'jest-each';
import { secondsToHours, dateToUnixTime } from './formatDate';

describe('formatDate', () => {
  describe('secondsToHours', () => {
    each([
      [{ hours: '455460', minutes: '21', seconds: '38' }, [1639657298]],
      [{ hours: '01', minutes: '00', seconds: '00' }, [3600]],
    ]).it('should result in %s when value is %s', (expected, value) => {
      expect(secondsToHours(value)).toStrictEqual(expected);
    });
  });
});

describe('formatDate', () => {
  describe('dateToUnixTime', () => {
    each([
      [1640434530000, '2021-12-25T12:15:30Z'],
      [1639666800000, '2021-12-16T15:00:00Z'],
    ]).it('should result in %s when value is %s', (expected, value) => {
      expect(dateToUnixTime(value)).toBe(expected);
    });
  });
});
