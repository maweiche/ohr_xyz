import styles from "../../landing/landing.module.css";
import Image from "next/image";
import ohr from "../../../assets/ear_big.png";
import useMenuStore from "utils/useMenuStore";

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
    <button onClick={onClick} disabled={isRecordingCompleted} className="mt-4">
      <Image
        className={isRecording ? styles["ear-img-active"] : styles["ear-img"]}
        src={ohr}
        alt="our logo - picture of the ear"
        height={320}
        width={320}
      />
    </button>
  );
};

export default EarBtn;
