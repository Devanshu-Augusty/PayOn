import React from "react";
import { I_Button } from "../../types/types";
import { motion } from "motion/react";

const Button: React.FC<I_Button> = ({
  buttonText,
  onClick,
  type = "button",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-white rounded-full px-3 py-1 font-medium text-black"
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </motion.button>
  );
};

export default Button;
