import React from "react";
import Card from "./common/Card";
import transactionImage from "../assets/send-money.jpg";
import historyImage from "../assets/transaction-history.png";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { authorizedMenu } from "../utils/data";

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#0A122A] text-white">
      <NavBar menu={authorizedMenu} isUserAuthorized={true} />
      <div className="flex justify-center pt-32 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-44">
          <Card
            title="Send Money"
            text="Initiate seamless payments with just a few clicks"
            imgSrc={transactionImage}
            onClick={() => {
              navigate("/search-user");
            }}
          />
          <Card
            title="Transaction History"
            text="Access a detailed log of your past transactions including amounts, time and dates"
            imgSrc={historyImage}
            onClick={() => {
              navigate("/history");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
