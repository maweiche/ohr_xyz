import { LoadingComponent } from "@components/LoadingComponent";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import { createMuxUpload } from "utils/mux";
import useMetadataStore from "utils/useMetadataStore";

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Listen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUploadID, setAudioBlob, metadata } = useMetadataStore();

  const { isRecordingFound } = router.query;

  let audioBlobUrl;
  if (metadata.audioBlob) {
    audioBlobUrl = URL.createObjectURL(metadata.audioBlob);
  }

  const handleContinue = async () => {
    setIsLoading(true);

    if (metadata.audioBlob) {
      setUploadID(await createMuxUpload(metadata.audioBlob));
    }

    router.push({
      pathname: "/create/locate",
    });
  };

  const handleBack = () => {
    setAudioBlob(null);

    router.push({
      pathname: "/",
    });
  };

  return (
    <LayoutComponent showWallet="header" showTitle="Listen">
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        initial="initial"
        animate="animate"
        variants={containerAnimation}
        transition={{ duration: 2.5 }}
      >
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className=" flex flex-col justify-center h-full items-center">
            <h1 className="text-2xl text-center mx-10">
              {isRecordingFound
                ? "Do you want to keep this recording?"
                : "Add your recording"}
            </h1>
            <audio controls className="m-10">
              <source src={audioBlobUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex flex-col text-center mt-8">
              <div className="flex justify-center gap-8">
                <button className="primary-btn" onClick={handleBack}>
                  discard
                </button>
                <button className="primary-btn " onClick={handleContinue}>
                  add
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </LayoutComponent>
  );
};

export default Listen;
