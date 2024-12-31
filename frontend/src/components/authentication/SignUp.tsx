import { useState } from "react";
import InputWithLabel from "../common/InputWithLabel";
import { I_SignUpData, initialSignUpData } from "../../types/types";
import Button from "../common/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "motion/react";

const SignUp: React.FC<{
  setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsSigningUp }) => {
  const [signUpData, setSignUpData] = useState<I_SignUpData>(initialSignUpData);

  const onSignUpClick = (e: any) => {
    e.preventDefault();
    if (
      signUpData.name === "" ||
      signUpData.email === "" ||
      signUpData.phone_number === "" ||
      signUpData.password === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    if (signUpData.password.length !== 6) {
      toast.error("Password must be of 6 characters");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    const signUpRequest = async () => {
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/v2/signup`,
          { ...signUpData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.message === "User Already exists") {
          toast.error(data.message);
        } else if (data.message === "User created successfully") {
          toast.success(data.message);
          setSignUpData(initialSignUpData);
          setIsSigningUp(false);
        } else {
          console.log("data:", data);
        }
      } catch (error) {
        toast.error(`An error occured. Please try again after some time`);
        console.error(error);
      }
    };

    signUpRequest();
  };

  return (
    <form onSubmit={(e) => onSignUpClick(e)}>
      <div className="flex flex-col gap-5">
        <InputWithLabel
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={signUpData.name}
          onchange={(e) => {
            setSignUpData((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
          delay={1}
        />
        <InputWithLabel
          label="Phone Number"
          name="phone_number"
          type="number"
          placeholder="Enter your phone number"
          value={signUpData.phone_number}
          onchange={(e) => {
            setSignUpData((prev: any) => {
              return {
                ...prev,
                phone_number: e.target.value,
              };
            });
          }}
          delay={2}
        />
        <InputWithLabel
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={signUpData.email}
          onchange={(e) => {
            setSignUpData((prev) => {
              return {
                ...prev,
                email: e.target.value,
              };
            });
          }}
          delay={3}
        />
        <InputWithLabel
          label="Password"
          name="password"
          type="password"
          placeholder="Create your password"
          value={signUpData.password}
          onchange={(e) => {
            setSignUpData((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
          delay={4}
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
            delay: 5 * 0.3,
          }}
        >
          <Button buttonText="Sign Up" type="submit" />
        </motion.div>
      </div>
    </form>
  );
};

export default SignUp;
