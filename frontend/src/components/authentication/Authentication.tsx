import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NavBar from "../NavBar";
import { unAuthorizedMenu } from "../../utils/data";

const Authentication = () => {
  const [isSigningUp, setIsSigningUp] = useState<boolean>(true);

  return (
    <div className="px-3 w-full h-screen overflow-y-scroll bg-authenticate-page text-white flex items-start justify-center pt-20 pb-10">
      <NavBar
        menu={unAuthorizedMenu}
        isUserAuthorized={false}
      />
      <div className="md:w-[900px] flex flex-col border rounded-2xl p-5 gap-4 md:gap-7">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center justify-center">
          {isSigningUp ?  "Create new account" : "Access Your PayON Account" }
        </h1>
        <div className="flex items-center justify-center text-sm md:text-lg">
          {isSigningUp ? (
            <p>Already have an account? </p>
          ) : (
            <p>Don't have an account? </p>
          )}
          <span
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="px-2 text-blue-500 cursor-pointer hover:text-blue-700"
          >
            {isSigningUp ? "Log In" : "Sign Up"}
          </span>
        </div>
        <div className="flex justify-center items-center">
        {isSigningUp ? <SignUp setIsSigningUp={setIsSigningUp} /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
