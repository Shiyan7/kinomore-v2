import { VideoTypes, Video } from 'shared/api';

export function getTrailer(videos: VideoTypes | undefined): Video | undefined {
  const trailers = videos?.trailers || videos?.teasers || [];
  const trailer = trailers?.find((t) => t.type === 'TRAILER' && t.site === 'youtube');
  return trailer || trailers[trailers?.length - 1];
}
