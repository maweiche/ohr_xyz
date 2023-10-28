import { LoadingComponent } from "@components/LoadingComponent";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import useMetadataStore from "utils/useMetadataStore";

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Describe = () => {
  const router = useRouter();
  const { metadata, setTheVibe } = useMetadataStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    router.push({
      pathname: "/create/locate",
    });
  };

  return (
    <LayoutComponent showWallet="header" showTitle="Describe">
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        initial="initial"
        animate="animate"
        variants={containerAnimation}
      >
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="flex flex-col justify-evenly align-center w-full h-full mt-2 items-center">
            <div className="flex flex-col  m-10 align-center justify-between items-center self-center">
              <div className="flex flex-col  items-center">
                <h2 className="mb-10 text-center text-2xl ">
                  How would you describe this moment?
                </h2>
                <motion.input
                  className="input input-bordered placeholder-purple-200 text-center rounded-xl w-full p-3 bg-purple-300/30 border-purple-300"
                  value={metadata.theVibe}
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

export default Describe;
