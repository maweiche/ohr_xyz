import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ErrorMessage";
import { LoadingComponent } from "@components/LoadingComponent";
import { getRecordingUrl } from "@components/create/minting/MintNFT";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { motion } from "framer-motion";
import { createMuxUpload } from "utils/mux";
import useMetadataStore from "utils/useMetadataStore";
import { getFirstArrayElementOrValue } from "utils/formatUtils";

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Listen = () => {
  const router = useRouter();
  const { setUploadID, setAudioBlob, metadata } = useMetadataStore();

  // in case user got redirected back to the listen page because of an error
  const { uploadID } = router.query;
  const parsedUploadID = getFirstArrayElementOrValue(uploadID);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecordingFound, setIsRecordingFound] = useState<boolean>(false);
  const [recordingUrl, setRecordingUrl] = useState<string | undefined>(
    undefined
  );
  const [hasErrored, setHasErrored] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (parsedUploadID) {
        setIsRecordingFound(true);
        try {
          const recUrl = await getRecordingUrl(parsedUploadID);
          setRecordingUrl(recUrl);
        } catch (error) {
          setHasErrored("There was a problem getting your recording");
          console.error("Error fetching recording URL:", error);
        }
      }
    };

    fetchData();
  }, [parsedUploadID]);

  const audioBlobUrl = metadata.audioBlob
    ? URL.createObjectURL(metadata.audioBlob)
    : undefined;

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
          // TODO: Set analytics
          setHasErrored("Your recording couldn't be uploaded");
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
    <LayoutComponent showWallet="header" showTitle="Listen" showFooter={false}>
      {hasErrored && (
        <ErrorMessage
          showModal={Boolean(hasErrored)}
          handleContinue={() => router.push("/create/listen")}
          buttonText="Try again"
          secondaryButtonText="Report a bug"
          secondaryHandleClick={() => {
            console.log("report to mux");
            router.push("/");
            // TODO: send them to telegram
          }}
          description={hasErrored}
          title="Something went wrong"
          handleClose={() => setHasErrored(undefined)}
        />
      )}
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        initial="initial"
        animate="animate"
        variants={containerAnimation}
        transition={{ duration: 1 }}
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
