import React from "react";
import { I_Card } from "../../types/types";
import { motion } from "motion/react";

const Card: React.FC<I_Card> = ({ title, text, imgSrc, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-[20rem] h-[25rem] flex flex-col border border-blue-500 rounded-2xl bg-slate-800 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt="card image"
        className="p-2 rounded-2xl w-full h-[15rem] bg-cover"
      />
      <h1 className="text-2xl font-bold p-2 text-slate-300">{title}</h1>
      <span className="text-lg font-medium px-2 pb-2 text-slate-400">
        {text}
      </span>
    </motion.div>
  );
};

export default Card;
