import React from "react";
import styles from "../footer.module.css";

export const OhrLogo = () => {
  return (
    <div className="mt-4">
      <h1 className={`text-xl md:mb-2 md:text-3xl ${styles["ohr-logo-title"]}`}>
        øhr
      </h1>
    </div>
  );
};
