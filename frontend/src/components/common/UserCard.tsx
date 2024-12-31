import React from "react";
import userDefaultImage from "../../assets/user-default.jpg";
import { I_UserCard } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const UserCard: React.FC<I_UserCard> = ({ name, phoneNumber, email, delay }) => {
  const navigate = useNavigate();
  return (
    <motion.div
    initial={{ opacity: 0, y: 70 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeIn", delay: delay }}
      title={name}
      className="w-60 h-20 p-2 border-2 bg-green-500 border-green-400 rounded-2xl cursor-pointer"
      onClick={() => navigate(`/transaction/${name}/${email}`)}
    >
      <div className="flex gap-2 justify-start items-center">
        <img
          src={userDefaultImage}
          alt="user image"
          className="h-12 w-12 rounded-full border-2 border-gray-400"
        />
        <div className="flex flex-col gap-[2px] truncate">
          <h2 className="text-2xl font-medium truncate">{name}</h2>
          <span className="text-gray-700 font-medium text-sm truncate">
            {phoneNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
