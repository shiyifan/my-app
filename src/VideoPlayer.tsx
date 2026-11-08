import { useEffect, useRef } from 'react';

let effectCount = 0;
export default function VideoPlayer({ isPlaying }: { isPlaying: boolean }) {
  const videoDom = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('Video player effect: ', effectCount++);
    if (isPlaying) {
      videoDom.current?.play();
    } else {
      videoDom.current?.pause();
    }

    return () => console.log('Video player cleanup');
  }, [isPlaying]);

  return (
    <div>
      <video ref={videoDom} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" width="400" loop></video>
    </div>
  );
}
