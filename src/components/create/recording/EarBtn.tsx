import styles from "../../landing/landing.module.css";
import Image from "next/image";
import ohr from "../../../assets/ear_big.png";

interface EarProps {
  onClick: () => void;
  isRecording: boolean;
  isRecordingCompleted: boolean;
}

const EarBtn: React.FC<EarProps> = ({
  onClick,
  isRecording,
  isRecordingCompleted,
}) => {
  return (
    <div className="flex z-0 justify-center items-center mb-5">
      <button
        onClick={onClick}
        disabled={isRecordingCompleted}
        className="text-center z-10 w-60"
      >
        <Image
          className={isRecording ? styles["ear-img-active"] : "ear-img"}
          src={ohr}
          alt="our logo - picture of the ear"
          width={300}
          height={300}
          style={{ objectFit: "contain", opacity: 0.7 }}
        />
        {/* {!isRecordingCompleted && (
          <p
            className={`${styles["ear-btn-text"]} text-center text-2xl z-10 absolute `}
          >
            {isRecording ? "stop" : "start"}
          </p>
        )} */}
      </button>
    </div>
  );
};

export default EarBtn;
