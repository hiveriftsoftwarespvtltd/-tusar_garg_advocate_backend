/**
 * YouTube Utility to extract Video ID, embed URL, and high quality thumbnail URL.
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  // 1. Match youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }

  // 2. Match youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // 3. Match youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // 4. Match youtube.com/embed/VIDEO_ID
  const embedMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // 5. Generic 11-char ID pattern if user entered raw ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function buildYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
}

export function buildYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function buildYouTubeMaxResThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function buildYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
