import styles from "@styles/Home.module.css";
import { LoadingComponent } from "@components/LoadingComponent";
import EarBtn from "@components/create/recording/EarBtn";
import Timer from "@components/create/recording/Timer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  getCurrentDateFormatted,
  getFirstArrayElementOrValue,
} from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";
import ErrorMessage from "@components/ErrorMessage";
import { getRecordingUrl } from "@components/create/minting/MintNFT";

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
  const [isRecordingTooShort, setIsRecordingTooShort] =
    useState<boolean>(false);

  const resetRecording = () => {
    setDiscardRecording(true);
    setIsRecording(false);
    setIsRecordingCompleted(false);
    setMediaRecorder(undefined);
    setIsLoading(false);
    setIsRecordingTooShort(false);
  };

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

  useEffect(() => {
    if (isRecordingCompleted && !isLoading) {
      router.push({
        pathname: "/create/listen",
      });
    }
  }, [isRecordingCompleted, isLoading, router]);

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;
  const showContinueButton = isRecordingCompleted && !isLoading;

  return (
    <>
      <div className="flex flex-col items-center align-center">
        {isRecordingTooShort && (
          <ErrorMessage
            showModal={isRecordingTooShort}
            handleContinue={() => {
              router.push("/");
              resetRecording();
            }}
            buttonText={"Okay"}
            description={"Try again"}
            title={"Your recording was too short"}
            handleClose={() => resetRecording()}
          />
        )}
        {showTimer && (
          <Timer
            isRecording={isRecording}
            discardRecording={discardRecording}
            setDiscardRecording={setDiscardRecording}
            setIsRecordingTooShort={setIsRecordingTooShort}
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
        {showHelpText && (
          <p className={styles["help-text"]}>click the ear to record</p>
        )}
      </div>
    </>
  );
};

export default RecordingPage;
