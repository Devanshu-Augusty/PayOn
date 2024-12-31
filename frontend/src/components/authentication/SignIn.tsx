import { useState } from "react";
import InputWithLabel from "../common/InputWithLabel";
import { I_SignInData, initialSignInData } from "../../types/types";
import Button from "../common/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const SignIn = () => {
  const [signInData, setSignInData] = useState<I_SignInData>(initialSignInData);

  const navigate = useNavigate();

  const onSignInClick = (e: any) => {
    e.preventDefault();
    if (signInData.email === "" || signInData.password === "") {
      toast.error("All fields are required");
      return;
    }
    if (signInData.password.length !== 6) {
      toast.error("Password must be of 6 characters");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    const signInRequest = async () => {
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/v2/signin`,
          { ...signInData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.message === "User does not exist") {
          toast.error(data.message);
        } else if (data.message === "Wrong Password") {
          toast.error(data.message);
        } else {
          toast.success("Logged in successfully");
          setSignInData(initialSignInData);
          localStorage.setItem("auth-token", data.token);
          navigate("/home");
        }
      } catch (error) {
        toast.error(`An error occured. Please try again after some time`);
        console.error(error);
      }
    };

    signInRequest();
  };

  return (
    <form onSubmit={(e) => onSignInClick(e)}>
      <div className="flex flex-col gap-5">
        <InputWithLabel
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={signInData.email}
          onchange={(e) => {
            setSignInData((prev) => {
              return {
                ...prev,
                email: e.target.value,
              };
            });
          }}
          delay={1}
        />
        <InputWithLabel
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={signInData.password}
          onchange={(e) => {
            setSignInData((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
          delay={2}
        />
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
            delay: 3 * 0.3,
          }}
        >
          <Button buttonText="Sign In" type="submit" />
        </motion.div>
      </div>
    </form>
  );
};

export default SignIn;
