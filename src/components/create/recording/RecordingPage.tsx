import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./recording.module.css";
import { LayoutComponent } from "../../layout/LayoutComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import EarBtn from "../../../components/create/recording/EarBtn";
import { getCurrentDateFormatted } from "utils/formatUtils";
import Timer from "./Timer";
import { LoadingComponent } from "../../LoadingComponent";
import { AudioBlobContext } from "context/AudioBlobContext";
import { createMuxUpload } from "../../../utils/mux";
import useMetadataStore from "utils/useMetadataStore";

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
  const { setAudioBlob, audioBlob, setUploadId } = useContext(AudioBlobContext);
  const wallet = useWallet();
  const { metadata, setMetadata, setUploadID, setTimeStamp } =
    useMetadataStore();

  // useEffect(() => {
  //   if (!wallet.connected) {
  //     router.push("/");
  //   }
  // }, [wallet, router]);

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
    setTimeStamp(getCurrentDateFormatted());
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    const chunks: Blob[] = [];

    recorder.ondataavailable = function (e: BlobEvent) {
      chunks.push(e.data);
    };

    recorder.onstop = function (e: Event) {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });

      setRecordingUrl(URL.createObjectURL(audioBlob));
      setIsRecording(false);
      setIsRecordingCompleted(true);

      setAudioBlob(audioBlob);
    };

    recorder.start();
  };

  const handleContinue = async (): Promise<void> => {
    setIsLoading(true);

    if (audioBlob) {
      setUploadID(await createMuxUpload(audioBlob));
    }

    router.push({
      pathname: "/create/describe",
    });
  };

  const showTimer = (isRecording || isRecordingCompleted) && !isLoading;
  const showHelpText = !isRecordingCompleted && !isRecording;
  const showContinueButton = isRecordingCompleted && !isLoading;

  return (
    <>
      <LayoutComponent showWallet="none" showTitle="record">
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
      </LayoutComponent>
    </>
  );
};

export default RecordingPage;
