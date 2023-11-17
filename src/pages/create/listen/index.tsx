import ErrorMessage from "@components/ErrorMessage";
import { LoadingComponent } from "@components/LoadingComponent";
import { getRecordingUrl } from "@components/create/minting/MintNFT";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [isRecordingFound, setIsRecordingFound] = useState<boolean>(false);
  const [recordingUrl, setRecordingUrl] = useState<string | undefined>(
    undefined
  );
  const [hasErrored, setHasErrored] = useState<boolean | undefined>(undefined);

  const { uploadID } = router.query;
  const parsedUploadID = getFirstArrayElementOrValue(uploadID);

  useEffect(() => {
    const fetchData = async () => {
      if (parsedUploadID) {
        setIsRecordingFound(true);
        try {
          const recUrl = await getRecordingUrl(parsedUploadID);
          setRecordingUrl(recUrl);
        } catch (error) {
          console.error("Error fetching recording URL:", error);
        }
      }
    };

    fetchData();
  }, [parsedUploadID]);

  let audioBlobUrl;
  if (metadata.audioBlob) {
    audioBlobUrl = URL.createObjectURL(metadata.audioBlob);
  }

  const handleContinue = async () => {
    setIsLoading(true);

    if (metadata.audioBlob) {
      createMuxUpload(metadata.audioBlob)
        .then((uploadID) => {
          setUploadID(uploadID);
          router.push({
            pathname: "/create/describe",
          });
        })
        .catch((err) => {
          // - Show error component saying that something went wrong
          // - Retry a couple times first?
          // - Reset the process for the user?
          // - Set analytics!!!
          setHasErrored(true);
          console.log(err);
        });
    }
  };

  const handleBack = () => {
    setAudioBlob(null);

    router.push({
      pathname: "/",
    });
  };

  return (
    <LayoutComponent showWallet="header" showTitle="Listen">
      {hasErrored && (
        <ErrorMessage
          showModal={true}
          handleContinue={() => router.push("/create/listen")}
          buttonText="Try again"
          secondaryButtonText="Report a bug"
          secondaryHandleClick={() => {
            console.log("report to mux");
            // TODO: send them to telegram
          }}
          description="Your recording couldn't be uploaded."
          title="Something went wrong"
          handleClose={() => setHasErrored(false)}
        />
      )}
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
              Do you want to keep this recording?
            </h1>
            <audio controls className="m-10">
              <source
                src={isRecordingFound ? recordingUrl : audioBlobUrl}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <div className="flex flex-col text-center mt-8">
              <div className="flex justify-center gap-8">
                <button className="secondary-btn" onClick={handleBack}>
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
