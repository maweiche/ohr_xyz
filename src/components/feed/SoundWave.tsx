import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

const formatTime = (totalSeconds: number, currentTime: number) => {
  const remainingSeconds = Math.max(totalSeconds - currentTime, 0);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = Math.floor(remainingSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

interface SoundWaveProps {
  audioUrl: string;
}

export const SoundWave: React.FC<SoundWaveProps> = ({ audioUrl }) => {
  const [duration, setDuration] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 50,
    width: "100%",
    waveColor: "#ffff",
    barHeight: 7,
    barRadius: 2,
    barWidth: 4,
    barGap: 2,
    progressColor: "#270220",
    url: audioUrl,
  });

  const togglePlayPause = useCallback(() => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.pause();
      } else {
        wavesurfer.play();
      }
    }
  }, [wavesurfer, isPlaying]);

  useEffect(() => {
    if (wavesurfer) {
      setDuration(wavesurfer.getDuration());
      wavesurfer.on("click", () => {
        togglePlayPause();
      });
    }
  });

  return (
    <div className="flex flex-col w-full mx-5">
      <div ref={containerRef} />
      <div className="flex justify-end">
        <p className="text-sm">{formatTime(duration, currentTime)}</p>
      </div>
      {/* <div className="flex justify-center">
        <button onClick={onPlayPause} className=" border p-1 my-2 rounded-2xl">
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div> */}
    </div>
  );
};
