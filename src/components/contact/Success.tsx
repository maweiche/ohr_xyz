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
          <p className="text-3xl text-purple-100">Check your email 👂</p>
        </div>
      </motion.div>
    </div>
  );
};
