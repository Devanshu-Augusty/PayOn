import { useContext, useState } from "react";
import { authorizedMenu } from "../utils/data";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import InputWithLabel from "./common/InputWithLabel";
import Button from "./common/Button";
import toast from "react-hot-toast";
import defaultImage from "../assets/receiver-image.jpg";
import { MyContext } from "../utils/context";
import { GradualSpacing } from "./common/TextAnimation";

interface I_TransactionData {
  receiver_email: string;
  sending_amount: number | "";
  note: string;
}

const Transaction = () => {
  const { email, name } = useParams();
  const initialTransactionData: I_TransactionData = {
    receiver_email: email ?? "",
    sending_amount: "",
    note: "",
  };
  const contextData = useContext(MyContext);
  const [transactionData, setTransactionData] = useState<I_TransactionData>(
    initialTransactionData
  );

  const onSendClick = async () => {
    if (transactionData.receiver_email === "") {
      toast.error("Email is not provided, please try again later");
      return;
    }
    if (transactionData.sending_amount === "" || transactionData.note === "") {
      toast.error("All fields are required");
      return;
    }
    if (contextData?.userData?.balance) {
      if (transactionData.sending_amount >= contextData?.userData?.balance) {
        toast.error("Not sufficent balance in your account");
        return;
      }
    } else {
      toast.error("There is some issue, please try after some time");
      return;
    }
    try {
      const authToken = localStorage.getItem("auth-token");
      const baseUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.post(
        `${baseUrl}/api/v2/send-money`,
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (data.message === "transaction successfull") {
        toast.success("Money Sent successfully");
        setTransactionData((prev) => ({
          ...prev,
          sending_amount: "",
          note: "",
        }));
        contextData?.verifyUser();
      }
    } catch (error) {
      toast.error("Some error occured, please try again later");
      console.error("error with transaction:", error);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0A122A] text-white">
      <NavBar menu={authorizedMenu} isUserAuthorized={true} />
      <div className="flex justify-center w-full  pt-32 pb-10 px-3">
        <div className="truncate w-[500px] h-[450px] border-4 border-green-400 rounded-xl px-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendClick();
            }}
          >
            <div className="truncate flex flex-col items-center gap-5 p-3">
              <img
                src={defaultImage}
                alt="profile image"
                className="h-32 w-32 rounded-full"
              />
              <div
                title={name}
                className="flex justify-center text-4xl w-full max-md:text-center truncate font-bold text-rose-100"
              >
                <GradualSpacing text={name ?? ""} />
              </div>
              <InputWithLabel
                name="sending_amount"
                label="Sending amount"
                placeholder="Enter amount you want to send"
                type="number"
                value={transactionData.sending_amount}
                onchange={(e) =>
                  setTransactionData((prev) => {
                    return {
                      ...prev,
                      sending_amount: Number(e.target.value) || "",
                    };
                  })
                }
                delay={1}
              />
              <InputWithLabel
                name="note"
                label="Note"
                placeholder="Enter Note"
                type="text"
                value={transactionData.note}
                onchange={(e) =>
                  setTransactionData((prev) => {
                    return {
                      ...prev,
                      note: e.target.value,
                    };
                  })
                }
                delay={2}
              />
              <div>
                <Button buttonText="Send Money" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
