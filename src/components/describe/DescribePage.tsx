import Layout from "@components/layout/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Loading } from "@components/Loading";

export const DescribePage = () => {
  const router = useRouter();

  const { recordingUrl, timeStamp } = router.query;

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theVibe, setTheVibe] = useState<string>("");

  const handleClick = () => {
    setIsClicked(true);
    setIsLoading(true);

    router.push({
      pathname: "/create/mint/[recordingUrl]",
      query: { recordingUrl, timeStamp, theVibe },
    });
  };

  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <Layout showWallet="header">
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        initial="initial"
        animate="animate"
        variants={containerAnimation}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col justify-evenly align-center w-full h-full mt-2 items-center">
            <h2 className="small-title">describe</h2>
            <div className="flex flex-col align-center justify-between items-center m-2 self-center">
              <div className="flex flex-col  items-center">
                <p className="mb-2">describe the vibe</p>
                <motion.input
                  className="input input-bordered placeholder-purple-200 text-center rounded-xl w-full p-3 bg-purple-300/30 border-purple-300"
                  placeholder="one word"
                  value={theVibe}
                  onChange={(e) => setTheVibe(e.target.value)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                ></motion.input>
              </div>
              <motion.button
                className="mt-10 p-4"
                onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
              >
                {isClicked ? <i>Next</i> : "next"}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};
