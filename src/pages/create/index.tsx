import styles from "@styles/Home.module.css";
import { LoadingComponent } from "@components/LoadingComponent";
import EarBtn from "@components/create/recording/EarBtn";
import Timer from "@components/create/recording/Timer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCurrentDateFormatted } from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";

const RecordingPage = () => {
  const router = useRouter();
  const { setTimeStamp, setAudioBlob, metadata } = useMetadataStore();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRecordingCompleted, setIsRecordingCompleted] =
    useState<boolean>(false);
  const [discardRecording, setDiscardRecording] = useState<boolean>(false);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(
    undefined
  );
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.discard === "true") {
      setDiscardRecording(true);
      setIsRecording(false);
      setIsRecordingCompleted(false);
      setMediaRecorder(undefined);
      setIsLoading(false);
    }
  }, [router.query.discard]);

  // TODO: this is still work in progress

  // useEffect(() => {
  //   if (metadata.audioBlob) {
  //     router.push({
  //       pathname: "/create/listen",
  //       query: { isRecordingFound: true },
  //     });
  //   }
  // }, [metadata.audioBlob, router]);

  const toggleRecording = async (): Promise<void> => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();

      // stop mic
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      return;
    }

    // user is being asked for mic allowance
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // start recording
    setIsRecording(true);
    setDiscardRecording(false);
    setTimeStamp(getCurrentDateFormatted());
    const recorder = new MediaRecorder(stream);

    setMediaRecorder(recorder);
    setMediaStream(stream);

    const chunks: Blob[] = [];
    recorder.ondataavailable = function (e: BlobEvent) {
      chunks.push(e.data);
    };

    recorder.onstop = function (e: Event) {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });

      setIsRecording(false);
      setIsRecordingCompleted(true);
      setAudioBlob(audioBlob);
    };

    recorder.start();
  };

  const handleContinue = async (): Promise<void> => {
    router.push({
      pathname: "/create/listen",
    });
  };

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;
  const showContinueButton = isRecordingCompleted && !isLoading;

  return (
    <>
      <div className="flex flex-col items-center align-center">
        {showTimer && (
          <Timer
            isRecording={isRecording}
            discardRecording={discardRecording}
            setDiscardRecording={setDiscardRecording}
          />
        )}
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <EarBtn
            isRecording={isRecording}
            onClick={toggleRecording}
            isRecordingCompleted={isRecordingCompleted}
          />
        )}
        {showHelpText ? (
          <p className={styles["help-text"]}>click the ear to record</p>
        ) : showContinueButton ? (
          <button className="btn-ghost text-md" onClick={handleContinue}>
            continue
          </button>
        ) : null}
      </div>
    </>
  );
};

export default RecordingPage;

// when recording is completed
// show mp3 player and let user listen to its sound
// two buttons: continue and record
