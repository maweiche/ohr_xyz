import ohr from "../../assets/ear_big.png";
import Image from "next/image";
import styles from "./landing.module.css";
import { motion } from "framer-motion";
import { ActiveAppDescription } from "./ActiveAppDescription";
import { PassiveAppDescription } from "./PassiveAppDescription";

interface LandingPageProps {
  isAppActive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isAppActive }) => {
  const imgVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
  };

  console.log("ISAPP ACTIVE", isAppActive);

  return (
    <div className="h-full">
      <div className="z-10 text-center flex flex-col justify-around h-full">
        <h1 className="text-5xl">
          {isAppActive ? "CATCH YOUR MOMENT" : "WE'RE GRINDING"}
        </h1>
        <div>
          <div className=" self-center">
            <motion.div
              className="mt-5 self-center"
              variants={imgVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1 }}
            >
              <Image
                className={`z-1 fixed ${styles["ear-img-active"]}`}
                src={ohr}
                alt="our logo - picture of the ear"
                width={isAppActive ? 250 : 300}
                height={isAppActive ? 250 : 300}
                style={{ opacity: 0.7 }}
              />
            </motion.div>
          </div>
          {isAppActive ? <ActiveAppDescription /> : <PassiveAppDescription />}
        </div>
      </div>
    </div>
  );
};
