import { authorizedMenu } from "../utils/data";
import NavBar from "./NavBar";
import defaultImage from "../assets/transac.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { I_TransactionData } from "../types/types";
import { MyContext } from "../utils/context";
import { motion } from "motion/react";
import { GradualSpacing } from "./common/TextAnimation";
import Loader from "./common/Loader";

const History = () => {
  const [transactionData, setTransactionData] = useState<I_TransactionData[]>();
  const contextData = useContext(MyContext);

  const getTransactions = async () => {
    try {
      const authToken = localStorage.getItem("auth-token");
      const baseUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(
        `${baseUrl}/api/v2/user-transactions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setTransactionData(
        data.transactions.map((transaction: any) => {
          const dateStr = transaction.created_at;
          const date = new Date(dateStr);

          // Extract date parts
          const day = date.getDate();
          const month = date.getMonth() + 1; // Months are 0-based
          const year = date.getFullYear().toString().slice(-2);
          const hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Format hours for 12-hour clock
          const period = hours >= 12 ? "pm" : "am";
          const hours12 = hours % 12 || 12;

          // Combine into the desired format
          const formattedDate = `${day}/${month}/${year}, (${hours12}:${minutes}${period})`;
          return {
            receiver_name: transaction.receiver_id.name,
            sender_name: transaction.sender_id.name,
            sender_email: transaction.sender_id.email,
            receiver_email: transaction.receiver_id.email,
            transaction_amount: transaction.amount,
            note: transaction.description,
            date: formattedDate,
          };
        })
      );
    } catch (error) {
      console.error("error :", error);
      toast.error("Something went wrong please try again later");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0A122A] text-white">
      <NavBar menu={authorizedMenu} isUserAuthorized={true} />
      <div className="h-full flex flex-col items-start md:px-80 px-3 pt-32 pb-5">
        <h1 className="text-4xl font-bold flex items-start justify-start w-full">
          <GradualSpacing text="Transaction History" />
        </h1>
        <div className="w-fit border p-2 my-4 rounded-lg float-left">
          Transactions: {transactionData?.length ?? 0}
        </div>
        <div className="flex flex-col border-y-4 border-green-400 py-3 overflow-y-scroll no-scrollbar w-full gap-2">
          {transactionData ? (
            transactionData.length <= 0 ? (
              <div>No Transaction yet</div>
            ) : (
              transactionData?.map((transaction, index) => {
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
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.4,
                    }}
                    key={index}
                    className="flex bg-slate-800 justify-between border rounded-xl py-2 px-3"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={defaultImage}
                        alt="pfp"
                        className="h-10 w-10 rounded-full bg-cover"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg">
                          {transaction.sender_email ===
                          contextData?.userData?.email
                            ? transaction.receiver_name
                            : transaction.sender_name}
                        </h3>
                        <span className="text-slate-300">
                          {transaction?.note}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`${
                          transaction.sender_email ===
                          contextData?.userData?.email
                            ? "text-red-500"
                            : "text-green-500"
                        } font-semibold`}
                      >
                        {transaction.sender_email ===
                        contextData?.userData?.email
                          ? "-"
                          : "+"}
                        {transaction.transaction_amount} Rs
                      </div>
                      <div>{transaction?.date}</div>
                    </div>
                  </motion.div>
                );
              })
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
