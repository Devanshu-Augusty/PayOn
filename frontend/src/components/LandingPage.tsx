import NavBar from "./NavBar";
import { IoTimeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import { unAuthorizedMenu } from "../utils/data";
import { GradualSpacing } from "./common/TextAnimation";
import { motion } from "motion/react";

const LandingPage = () => {
  const navigate = useNavigate();

  const dummyData: {
    icon: JSX.Element;
    text: string;
  }[] = [
    {
      icon: <IoTimeOutline />,
      text: "Solve Problems Real time",
    },
    {
      icon: <FaLock />,
      text: "Secured and Safe Payments",
    },
    {
      icon: <TfiHeadphoneAlt />,
      text: "24/7 Customer Support",
    },
  ];

  const onClick = () => {
    navigate("/authentication");
  };

  return (
    <div className="">
      <div className="flex flex-col justify-between w-full h-screen bg-landing-page bg-cover overflow-y-scroll">
        <NavBar menu={unAuthorizedMenu} isUserAuthorized={false} />
        <motion.div
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
          className="fixed top-20 md:top-0 md:px-24 px-3 py- md:py-6 max-md:left-0 md:right-0"
        >
          <Button
            buttonText="Sign Up/Log In"
            onClick={() => navigate("/authentication")}
          />
        </motion.div>

        <div className="pt-32 flex flex-col gap-5 just px-3 md:px-24 text-white">
          <div className="flex flex-col md:flex-row max-md:gap-2">
            <div className="text-4xl md:text-8xl flex flex-col font-bold w-[65%] font-serif">
              <GradualSpacing text="THE NEXT GEN" />
              <GradualSpacing text="PAYMENT" />
              <GradualSpacing text="METHOD" />
            </div>
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.8,
              }}
              className="flex flex-col items-start justify-end pb-5 gap-3 md:gap-12"
            >
              <span className="text-xl font-medium">
                Manage transactions seamlessly, search users effortlessly, and
                make secure payments in just a few clicks.
              </span>
              <Button buttonText="Get Started" onClick={onClick} />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 px-24 py-10 bg-black bg-opacity-50">
          {dummyData.map((data, index) => {
            return (
              <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.6,
              }} key={index} className="flex flex-col gap-2 pl-2 text-white">
                <div className="rounded-full w-8 h-8 flex justify-center items-center bg-purple-600 text-xl">
                  {data.icon}
                </div>
                <span className="text-2xl font-bold">{data.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
