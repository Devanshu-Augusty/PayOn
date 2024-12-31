import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import {
  authorizedMenu,
  socialMediaLinks,
  unAuthorizedMenu,
} from "../utils/data";
import { MyContext } from "../utils/context";
import Button from "./common/Button";
import InputWithLabel from "./common/InputWithLabel";
import { GradualSpacing } from "./common/TextAnimation";
import { motion } from "motion/react";
import { I_TextInputLabel } from "../types/types";
import toast from "react-hot-toast";
import goku from "../assets/goku_hi-bg.png";

const Contact = () => {
  const contextData = useContext(MyContext);
  const contactAcessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY
  const [contactData, setContactData] = useState<{
    name: string;
    email: string;
    message: string;
    access_key: any;
  }>({
    name: "",
    email: "",
    message: "",
    access_key: `${contactAcessKey}`,
  });

  const onContactClick = async () => {
    if (
      contactData.name === "" ||
      contactData.email === "" ||
      contactData.message === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    const json = JSON.stringify(contactData);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Message sent successfully.");
      setContactData({
        name: "",
        email: "",
        message: "",
        access_key: "1f2da906-be37-4c2f-bc52-537023bcbea4",
      });
    } else {
      toast.error("error: please try again later");
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#0A122A] text-white">
      <NavBar
        menu={contextData?.userData?.email ? authorizedMenu : unAuthorizedMenu}
        isUserAuthorized={contextData?.userData?.email ? true : false}
      />
      <div className="flex justify-center pt-32 pb-10 px-3">
        <div className="truncate flex md:justify-between flex-col max-md:items-center md:flex-row p-4 border-4 border-green-400 md:w-[70%] rounded-xl h-fit">
          <div className="relative md:w-1/2 w-full truncate flex flex-col gap-5 p-3">
            <div className="flex justify-center text-4xl w-full max-md:text-center truncate font-bold text-rose-100">
              <GradualSpacing text="Contact Me" />
            </div>
            <div className="z-10 w-full p-8 justify-center flex flex-wrap gap-2 items-center relative">
              {socialMediaLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="/blank"
                  className="bg-slate-800 rounded-xl gap-2 p-2 text-white flex items-center font-bold"
                >
                  {<link.icon />}
                  <span className="text-white">{link.title}</span>
                </a>
              ))}
            </div>
            <img src={goku} alt="Goku" className="max-md:hidden h-96 left-1/4 bottom-0 absolute" />
          </div>
          <div className="truncate rounded-xl px-2 md:w-1/2 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onContactClick();
              }}
            >
              <div className="truncate flex flex-col gap-5 p-3">
                <div className="flex justify-center text-4xl w-full max-md:text-center truncate font-bold text-rose-100">
                  <GradualSpacing text="Leave a Message" />
                </div>
                <InputWithLabel
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  value={contactData.name}
                  onchange={(e) => {
                    setContactData((prev) => {
                      return {
                        ...prev,
                        name: e.target.value,
                      };
                    });
                  }}
                  delay={1}
                />
                <InputWithLabel
                  name="email"
                  label="Email"
                  placeholder="Enter you email"
                  type="email"
                  value={contactData.email}
                  onchange={(e) => {
                    setContactData((prev) => {
                      return {
                        ...prev,
                        email: e.target.value,
                      };
                    });
                  }}
                  delay={2}
                />
                <TextInputLabel
                  name="message"
                  label="Your Message"
                  placeholder="Enter your message"
                  value={contactData.message}
                  onchange={(e) => {
                    setContactData((prev) => {
                      return {
                        ...prev,
                        message: e.target.value,
                      };
                    });
                  }}
                  delay={3}
                />
                <div>
                  <Button buttonText="Contact Me" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextInputLabel: React.FC<I_TextInputLabel> = ({
  label,
  placeholder,
  name,
  onchange,
  value,
  delay = 1,
}) => {
  return (
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
        delay: delay * 0.3,
      }}
      className="flex flex-col gap-1"
    >
      <label htmlFor={name} className="pl-4 text-slate-400 text-lg font-medium">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        className="w-72 md:w-96 flex justify-center items-center py-2 font-medium px-4 rounded-3xl outline-none border-none bg-slate-800"
        value={value}
        onChange={onchange}
        rows={3}
      />
    </motion.div>
  );
};

export default Contact;
