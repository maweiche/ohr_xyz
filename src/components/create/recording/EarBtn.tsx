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
    <div className="flex z-0 justify-center items-center">
      <button
        onClick={onClick}
        disabled={isRecordingCompleted}
        className="text-center z-10"
      >
        <Image
          className={isRecording ? styles["ear-img-active"] : "ear-img"}
          src={ohr}
          alt="our logo - picture of the ear"
        />
      </button>
    </div>
  );
};

export default EarBtn;
