import type { VideoTypes } from 'shared/api';
import { getTrailer } from './getTrailer';

describe('getTrailer', () => {
  test('should return the first trailer with type "TRAILER" and site "youtube"', () => {
    const videos: VideoTypes = {
      trailers: [
        { url: 'https://youtube.com/trailer1', name: 'Trailer 1', site: 'youtube', size: 100, type: 'TRAILER' },
        { url: 'https://youtube.com/trailer2', name: 'Trailer 2', site: 'youtube', size: 200, type: 'TRAILER' },
        { url: 'https://youtube.com/trailer3', name: 'Trailer 3', site: 'youtube', size: 300, type: 'TEASER' },
      ],
      teasers: [
        { url: 'https://youtube.com/teaser1', name: 'Teaser 1', site: 'youtube', size: 100, type: 'TEASER' },
        { url: 'https://youtube.com/teaser2', name: 'Teaser 2', site: 'youtube', size: 200, type: 'TEASER' },
        { url: 'https://youtube.com/teaser3', name: 'Teaser 3', site: 'youtube', size: 300, type: 'TRAILER' },
      ],
    };
    const result = getTrailer(videos);
    expect(result).toEqual({
      url: 'https://youtube.com/trailer1',
      name: 'Trailer 1',
      site: 'youtube',
      size: 100,
      type: 'TRAILER',
    });
  });

  test('should return the last trailer when no trailer with type "TRAILER" and site "youtube" is found', () => {
    const videos: VideoTypes = {
      trailers: [
        { url: 'https://test.com/trailer1', name: 'Trailer 1', site: 'test', size: 100, type: 'TEASER' },
        { url: 'https://test.com/trailer2', name: 'Trailer 2', site: 'test', size: 200, type: 'TEASER' },
        { url: 'https://test.com/trailer3', name: 'Trailer 3', site: 'test', size: 300, type: 'TEASER' },
      ],
      teasers: [],
    };
    const result = getTrailer(videos);
    expect(result).toEqual({
      url: 'https://test.com/trailer3',
      name: 'Trailer 3',
      site: 'test',
      size: 300,
      type: 'TEASER',
    });
  });

  test('should return undefined when no trailers are found', () => {
    const videos: VideoTypes = {
      trailers: [],
      teasers: [],
    };
    const result = getTrailer(videos);
    expect(result).toBeUndefined();
  });
});
