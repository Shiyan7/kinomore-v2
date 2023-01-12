import { VideoTypes } from 'shared/api';

export function getTrailer(videos: VideoTypes | undefined): string {
  videos?.trailers.forEach((el) => el.url);

  return '';
}
