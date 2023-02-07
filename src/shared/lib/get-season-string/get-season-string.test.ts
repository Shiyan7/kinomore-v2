import { getSeasonString } from './get-season-string';

describe('getSeasonString', () => {
  test('returns "1 сезон" when length is 1', () => {
    expect(getSeasonString(1)).toBe('1 сезон');
  });

  test('returns "2 сезона" when length is 2', () => {
    expect(getSeasonString(2)).toBe('2 сезона');
  });

  test('returns "4 сезона" when length is 4', () => {
    expect(getSeasonString(4)).toBe('4 сезона');
  });

  test('returns "5 сезонов" when length is 5', () => {
    expect(getSeasonString(5)).toBe('5 сезонов');
  });

  test('returns "11 сезонов" when length is 11', () => {
    expect(getSeasonString(11)).toBe('11 сезонов');
  });
});
