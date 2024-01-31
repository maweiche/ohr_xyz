import * as React from "react";
import { useState, useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

const audioUrls: string[] = [
  "/examples/audio/audio.wav",
  "/examples/audio/stereo.mp3",
  "/examples/audio/mono.mp3",
  "/examples/audio/librivox.mp3",
];

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

interface SoundWaveProps {
  audioUrl: string;
}

export const SoundWave: React.FC<SoundWaveProps> = ({ audioUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 50,
    width: 300,
    waveColor: "#ffff",
    barHeight: 7,
    barRadius: 2,
    barWidth: 4,
    barGap: 2,
    progressColor: "#270220",
    url: audioUrl,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div className="flex flex-col">
      <div ref={containerRef} />

      <div className="flex justify-between m-1">
        <button onClick={onPlayPause} className=" rounded-xl p-2">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <p>{formatTime(currentTime)}</p>
      </div>
    </div>
  );
};
