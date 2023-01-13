import { VideoTypes } from 'shared/api';

export function getTrailer(videos: VideoTypes | undefined): string {
  const trailers = videos?.trailers.reverse() ?? [];
  const trailer = trailers?.find((t) => t.type === 'TRAILER' && t.site === 'youtube');
  return trailer ? trailer?.url : trailers[trailers?.length - 1]?.url;
}
