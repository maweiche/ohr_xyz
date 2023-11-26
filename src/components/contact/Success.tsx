import React from "react";
import { motion } from "framer-motion";

export const Success = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
      >
        <div className="text-center">
          <p className="text-2xl text-purple-100">Almost there</p>
          <p className="text-xs text-purple-100 mt-1">
            Check your email for more info
          </p>
        </div>
      </motion.div>
    </div>
  );
};
