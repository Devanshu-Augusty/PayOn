import { useEffect, useMemo, useState } from "react";
import { authorizedMenu } from "../utils/data";
import NavBar from "./NavBar";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import UserCard from "./common/UserCard";
import { motion } from "motion/react";
import Loader from "./common/Loader";

interface I_UsersData {
  name: string;
  email: string;
  phone_number: number;
}

const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [usersData, setUsersData] = useState<I_UsersData[]>([]);

  const filteredData: I_UsersData[] = useMemo(() => {
    return usersData?.filter((user) =>
      user.phone_number.toString().includes(searchValue)
    );
  }, [searchValue, usersData]);

  const getAllUsers = async () => {
    try {
      const authToken = localStorage.getItem("auth-token");
      const baseUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(`${baseUrl}/api/v2/all-users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsersData(data?.users);
    } catch (error) {
      console.error("error verifing:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0A122A] text-white">
      <NavBar menu={authorizedMenu} isUserAuthorized={true} />
      <div className="flex flex-col gap-10 pt-32 md:pt-20 pb-10 justify-center items-center px-3 md:px-24">
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
          className="flex gap-2 rounded-full px-2 py-1 md:p-2 bg-slate-800 items-center"
        >
          <IoSearchOutline className="md:h-10 md:w-10 h-7 w-7" />
          <input
            type="text"
            placeholder="Search by Phone Number"
            className="md:w-96 flex text-lg justify-center items-center py-1 md:py-2 font-medium px-4 outline-none border-none bg-slate-800 rounded-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </motion.div>

        {usersData.length ? (
          <div className="max-h-[460px] pb-14 overflow-auto no-scrollbar w-full md:grid flex max-md:flex-col max-md:items-center max-md:gap-7 md:grid-cols-4 gap-y-7 md:gap-y-20">
            {filteredData?.map((user, index) => {
              return (
                <UserCard
                  key={user?.email}
                  name={user?.name ?? ""}
                  phoneNumber={user?.phone_number ?? ""}
                  email={user?.email}
                  delay={index * 0.3}
                />
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
