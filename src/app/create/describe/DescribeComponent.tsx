"use client";

import LoadingComponent from "../../../components/LoadingComponent";
import { LayoutComponent } from "../../../components/layout/LayoutComponent";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import useMetadataStore from "../../../utils/useMetadataStore";
import React from "react";

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const DescribeComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const {
    metadata: { theVibe, timeStamp, uploadID },
    setTheVibe,
  } = useMetadataStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createQueryString = useCallback(
    (queryParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      for (const [name, value] of Object.entries(queryParams)) {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChangeRoute = (route: string) => {
    const queryParams = {
      theVibe: theVibe,
      uploadID: uploadID,
      timeStamp: timeStamp,
    };
    const queryString = createQueryString(queryParams);

    router.push(route + "?" + queryString);
  };

  const handleClick = () => {
    setIsLoading(true);

    if (theVibe === "") {
      setTheVibe("Bullish");
    }

    const locationDisabled = localStorage.getItem("locationDisabled");

    if (locationDisabled === "true") {
      handleChangeRoute("/create/mint");
    } else {
      router.push("/create/locate");
    }
  };

  return (
    <LayoutComponent showTitle="Describe" showFooter={false}>
      <motion.div
        className="flex flex-col items-center justify-center h-full py-16"
        initial="initial"
        animate="animate"
        variants={containerAnimation}
        style={{ height: "100dvh" }}
      >
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="flex flex-col justify-center align-center w-full h-full mt-2 items-center">
            <div className="flex flex-col  m-10 align-center justify-between items-center self-center">
              <div className="flex flex-col items-center">
                <h2 className="mb-10 text-center text-2xl ">
                  How would you describe this moment?
                </h2>
                <motion.input
                  className="input input-bordered placeholder-purple-200 text-center rounded-xl w-full p-3 bg-purple-300/30 border-purple-300"
                  value={theVibe}
                  onChange={(e) => setTheVibe(e.target.value)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                ></motion.input>
              </div>
              <motion.button
                className="primary-btn m-10"
                onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
              >
                next
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </LayoutComponent>
  );
};

export default DescribeComponent;
