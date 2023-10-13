import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./recording.module.css";
import Layout from "../../layout/Layout";

import EarBtn from "@components/create/recording/EarBtn";
import { getCurrentDateFormatted } from "utils/formatUtils";
import Timer from "./Timer";
import { Loading } from "@components/loading";

const RecordingPage: React.FC = () => {
  const router = useRouter();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [discardRecording, setDiscardRecording] = useState<boolean>(false);
  const [isRecordingCompleted, setIsRecordingCompleted] =
    useState<boolean>(false);
  const [recordingUrl, setRecordingUrl] = useState<string>("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<string>(getCurrentDateFormatted());

  useEffect(() => {
    if (router.query.discard === "true") {
      setDiscardRecording(true);
      setIsRecording(false);
      setIsRecordingCompleted(false);
      setRecordingUrl("");
      setMediaRecorder(undefined);
      setIsLoading(false);
    }
  }, [router.query.discard]);

  const toggleRecording = async (): Promise<void> => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      return;
    }

    setDiscardRecording(false);
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    const chunks: Blob[] = [];

    recorder.ondataavailable = function (e: BlobEvent) {
      chunks.push(e.data);
    };

    recorder.onstop = function (e: Event) {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });

      console.log("audioBlob: ", audioBlob);
      console.log("blob url: ", URL.createObjectURL(audioBlob));

      setRecordingUrl(URL.createObjectURL(audioBlob));
      setIsRecording(false);
      setIsRecordingCompleted(true);
    };

    recorder.start();
  };

  const handleContinue = (): void => {
    setIsLoading(true);

    router.push({
      pathname: "/create/describe",
      query: { recordingUrl, timeStamp },
    });
  };

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;
  const showContinueButton = isRecordingCompleted && !isLoading;

  return (
    <>
      <Layout showWallet="none" showTitle="record">
        <div className="flex flex-col items-center align-center">
          {showTimer && (
            <Timer
              isRecording={isRecording}
              discardRecording={discardRecording}
              setDiscardRecording={setDiscardRecording}
            />
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <EarBtn
              isRecording={isRecording}
              onClick={toggleRecording}
              isRecordingCompleted={isRecordingCompleted}
            />
          )}
        </div>
        {showHelpText && (
          <div className={`${styles["help-text"]}`}>
            click the ear to record
          </div>
        )}

        {showContinueButton && (
          <div className={`${styles["continue-btn"]}`}>
            <button className="btn-ghost" onClick={handleContinue}>
              continue
            </button>
          </div>
        )}
      </Layout>
    </>
  );
};

export default RecordingPage;
