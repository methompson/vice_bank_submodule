import { isFrequency } from './frequency';

describe('frequency', () => {
  describe('isFrequency', () => {
    test('returns true if the input is a valid frequency', () => {
      expect(isFrequency('daily')).toBe(true);
      expect(isFrequency('weekly')).toBe(true);
      expect(isFrequency('monthly')).toBe(true);
    });

    test('returns false if the input is not a valid frequency', () => {
      expect(isFrequency('invalidFrequency')).toBe(false);
    });
  });
});
