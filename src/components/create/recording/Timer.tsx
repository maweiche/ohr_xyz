import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./recording.module.css";

interface TimerProps {
  isRecording: boolean;
  discardRecording: boolean;
  setDiscardRecording: Dispatch<SetStateAction<boolean>>;
  setIsRecordingTooShort: Dispatch<SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({
  isRecording,
  discardRecording,
  setDiscardRecording,
  setIsRecordingTooShort,
}) => {
  const [passedTime, setPassedTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRecording) {
      timer = setInterval(() => {
        setPassedTime((prevPassedTime) => prevPassedTime + 0.01);
      }, 10);
    } else {
      if (passedTime < 1) {
        setIsRecordingTooShort(true);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRecording, passedTime, setIsRecordingTooShort]);

  useEffect(() => {
    if (discardRecording) {
      setPassedTime(0);
      setDiscardRecording(false);
    }
  }, [discardRecording, setDiscardRecording]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time) % 60;
    const milliseconds = (time % 1).toFixed(2).substring(2);

    return `${minutes < 10 ? "0" + minutes : minutes}.${
      seconds < 10 ? "0" + seconds : seconds
    }.${milliseconds}`;
  };

  return (
    <div className={`${styles["timer"]} italic text-5xl z-10 `}>
      {formatTime(passedTime)}
    </div>
  );
};

export default Timer;
