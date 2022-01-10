import each from 'jest-each';
import { linearGradient } from './gradients';

describe('gradients', () => {
  describe('linearGradient', () => {
    each([
      ['linear-gradient(150deg, #FFF 0%, #000 100%)', '150deg', ['#FFF', '#000']],
      ['linear-gradient(150deg, #FFF 0%, #CCC 50%, #000 100%)', '150deg', ['#FFF', '#CCC', '#000']],
      [
        'linear-gradient(150deg, #FFF 0%, #AAA 33.3%, #888 66.6%, #000 100%)',
        '150deg',
        ['#FFF', '#AAA', '#888', '#000'],
      ],
      [
        'linear-gradient(150deg, #FFF 0%, #CCC 25%, #AAA 50%, #666 75%, #000 100%)',
        '150deg',
        ['#FFF', '#CCC', '#AAA', '#666', '#000'],
      ],
    ]).it('should result in %s when angle is %s and colors are %s', (expected, angle, colors) => {
      expect(linearGradient(angle, ...colors)).toBe(expected);
    });
  });
});
