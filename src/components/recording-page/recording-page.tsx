import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./recording-page.module.css";
import Layout from "../layout/layout";
import Timer from "./timer";
import EarBtn from "@components/layout/btns/ear-btn";
import { Loading } from "@components/loading";
import { getCurrentDateFormatted } from "utils/formatUtils";

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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = function (e: BlobEvent) {
        chunks.push(e.data);
      };

      recorder.onstop = function (e: Event) {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setRecordingUrl(URL.createObjectURL(audioBlob));
        setIsRecording(false);
        setIsRecordingCompleted(true);

        stream.getTracks().forEach((track) => track.stop());
      };

      setDiscardRecording(false);
      setIsRecording(true);
      setMediaRecorder(recorder);

      recorder.start();

      if (isRecording && mediaRecorder) {
        mediaRecorder.stop();
        return;
      }
    } catch (error) {
      // Handle the error. This will typically be a DOMException with name
      // "NotAllowedError" if the user denies permission.
      console.error("Error starting the recording:", error);
    }
  };

  const handleContinue = (): void => {
    setIsLoading(true);

    router.push({
      pathname: "/describe",
      query: { recordingUrl, timeStamp },
    });
  };

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;
  const showContinueButton = isRecordingCompleted && !isLoading;

  return (
    <>
      <Layout showWallet="header">
        <h3 className="small-title">Record</h3>
        <div className="flex flex-col justify-center items-center">
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
