import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { I_Navbar, initialUserData } from "../types/types";
import { motion } from "motion/react";
import { MyContext } from "../utils/context";

const NavBar: React.FC<I_Navbar> = ({ menu, isUserAuthorized }) => {
  const navigate = useNavigate();
  const contextData = useContext(MyContext);
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      }}
      className="fixed top-0 flex max-md:flex-col max-md:gap-3 w-full justify-between items-start md:items-center md:px-24 px-2 py-5"
    >
      <div className="rounded-full bg-black bg-opacity-70 border py-2 px-4 flex gap-10 items-center justify-center text-white">
        <Link
          to={isUserAuthorized ? "/home" : "/"}
          className="text-2xl md:text-3xl font-bold italic"
        >
          PayOn
        </Link>
        {menu.map((option, index) => {
          return (
            <Link
              key={index}
              to={option.path}
              className="text-sm md:text-lg font-medium"
            >
              {option.name}
            </Link>
          );
        })}
      </div>
      <div className="flex max-md:w-16">
        {isUserAuthorized ? (
          <div className="flex max-md:gap-6 items-center">
            <div className="flex gap-1 text-xl text-white font-medium max-md:pl-4">
              Balance:{" "}
              <span className="text-green-500">
                +{contextData?.userData.balance}
              </span>
            </div>
            <div className="flex truncate md:px-4 py-1">
              <Button
                buttonText="Sign Out"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  navigate("/");
                  contextData?.setUserData(initialUserData);
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </motion.nav>
  );
};

export default NavBar;
