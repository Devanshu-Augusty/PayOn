import React from "react";
import { I_InputwithLabel } from "../../types/types";
import {motion} from "motion/react"

const InputWithLabel: React.FC<I_InputwithLabel> = ({
  label,
  type,
  placeholder,
  name,
  onchange,
  value,
  delay = 1
}) => {
  return (
    <motion.div
    initial={{
      opacity: 0,
      x: -40
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.8,
      ease: "easeOut",
      delay: delay * 0.3
    }}
     className="flex flex-col gap-1">
      <label htmlFor={name} className="pl-4 text-slate-400 text-lg font-medium">{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="w-72 md:w-96 flex justify-center items-center py-2 font-medium px-4 rounded-full outline-none border-none bg-slate-800"
        value={value}
        onChange={onchange}
      />
    </motion.div>
  );
};

export default InputWithLabel;
