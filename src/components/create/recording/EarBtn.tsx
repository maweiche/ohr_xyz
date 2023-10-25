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
    <button onClick={onClick} disabled={isRecordingCompleted} className="mt-2">
      <Image
        className={isRecording ? styles["ear-img-active"] : styles["ear-img"]}
        src={ohr}
        alt="our logo - picture of the ear"
      />
    </button>
  );
};

export default EarBtn;
