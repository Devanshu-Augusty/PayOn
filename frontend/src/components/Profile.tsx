import { useContext } from "react";
import { authorizedMenu } from "../utils/data";
import NavBar from "./NavBar";
import profileImage from "../assets/profile.jpg";
import { MyContext } from "../utils/context";
import { GradualSpacing } from "./common/TextAnimation";

const Profile = () => {
  const contextData = useContext(MyContext);
  const userData = contextData?.userData;

  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#0A122A] text-white">
      <NavBar menu={authorizedMenu} isUserAuthorized={true} />
      <div className="flex justify-center pt-32 pb-10 px-3">
        <div className="truncate flex flex-col max-md:items-center md:flex-row gap-5 md:gap-10 p-4 border-4 border-green-400 w-[600px] rounded-xl h-fit">
          <img
            src={profileImage}
            alt="profile image"
            className="h-32 w-32 rounded-full"
          />
          <div className="flex flex-col gap-3 w-full md:w-fit truncate">
            <div title={userData?.name} className="flex justify-center items-center text-4xl max-md:text-center truncate font-bold text-rose-100">
              <GradualSpacing text={userData?.name ?? ""} />
            </div>
            <ProfileInfo
              title="Balance"
              value={`${userData?.balance ?? ""} Rs`}
            />
            <ProfileInfo title="Email" value={userData?.email ?? ""} />
            <ProfileInfo
              title="Phone Number"
              value={userData?.phone_number?.toString() ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="text-xl text-teal-200 font-medium pl-4">{title}</div>
      <div className="px-4 bg-slate-800 text-teal-300  p-2 rounded-full text-lg font-medium">
        {value}
      </div>
    </div>
  );
};

export default Profile;
