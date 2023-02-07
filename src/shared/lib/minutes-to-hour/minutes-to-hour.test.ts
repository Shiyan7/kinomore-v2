import { minutesToHour } from './minutes-to-hour';

describe('minutesToHour', () => {
  test('converts 0 minutes to 0 hours', () => {
    expect(minutesToHour(0)).toBe('0 мин');
  });

  test('converts 60 minutes to 1 hour', () => {
    expect(minutesToHour(60)).toBe('1 ч 0 мин');
  });

  test('converts 90 minutes to 1 hour and 30 minutes', () => {
    expect(minutesToHour(90)).toBe('1 ч 30 мин');
  });

  test('converts 180 minutes to 3 hours', () => {
    expect(minutesToHour(180)).toBe('3 ч 0 мин');
  });

  test('converts negative input to positive', () => {
    expect(minutesToHour(-60)).toBe('0 мин');
  });
});
