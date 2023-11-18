import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ErrorMessage";
import { getCurrentDateFormatted } from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";
import useDialogStore from "utils/useDialogStore";
import { LoadingComponent } from "@components/LoadingComponent";
import EarBtn from "@components/create/recording/EarBtn";
import Timer from "@components/create/recording/Timer";
import styles from "@styles/Home.module.css";

const getUserMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return stream;
};

const RecordingPage = () => {
  const router = useRouter();
  const { setTimeStamp, setAudioBlob } = useMetadataStore();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRecordingCompleted, setIsRecordingCompleted] =
    useState<boolean>(false);
  const [discardRecording, setDiscardRecording] = useState<boolean>(false);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(
    undefined
  );
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecordingTooShort, setIsRecordingTooShort] = useState<
    boolean | undefined
  >(undefined);
  const [hasErrored, setHasErrored] = useState<boolean | undefined>(undefined);

  const { setIsAboutBtnDisabled } = useDialogStore();

  const resetRecording = () => {
    setDiscardRecording(true);
    setIsRecording(false);
    setIsRecordingCompleted(false);
    setMediaRecorder(undefined);
    setIsLoading(false);
    setIsRecordingTooShort(undefined);
    setHasErrored(undefined);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const startRecording = (stream: MediaStream) => {
    setIsAboutBtnDisabled(true);
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
      setIsAboutBtnDisabled(false);
    };

    recorder.start();
  };

  const toggleRecording = async (): Promise<void> => {
    if (isRecording && mediaRecorder) {
      stopRecording();
      return;
    }

    try {
      const stream = await getUserMedia();
      startRecording(stream);
    } catch (error) {
      setHasErrored(true);
      console.error("Error while starting recording:", error);
    }
  };

  useEffect(() => {
    if (isRecordingCompleted && !isRecordingTooShort) {
      router.push({
        pathname: "/create/listen",
      });
    }
  }, [isRecordingTooShort]);

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;

  return (
    <>
      <div className="flex flex-col items-center align-center">
        {(isRecordingTooShort || hasErrored) && (
          <ErrorMessage
            showModal={true}
            handleContinue={() => {
              router.push("/");
              resetRecording();
            }}
            buttonText={"Okay"}
            description={"Try again"}
            title={
              isRecordingTooShort
                ? "Your recording was too short"
                : "Something went wrong"
            }
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
