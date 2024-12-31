import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { autherizedRoutes, unAuthorizedRoutes } from "./utils/data";
import { I_UserData, initialUserData } from "./types/types";
import { MyContext } from "./utils/context";
import Loader from "./components/common/Loader";
const LandingPage = React.lazy(() => import("./components/LandingPage"));
const Authentication = React.lazy(
  () => import("./components/authentication/Authentication")
);
const Home = React.lazy(() => import("./components/Home"));
const Profile = React.lazy(() => import("./components/Profile"));
const SearchUsers = React.lazy(() => import("./components/SearchUsers"));
const Transaction = React.lazy(() => import("./components/Transaction"));
const History = React.lazy(() => import("./components/History"));
const Contact = React.lazy(() => import("./components/Contact"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState<I_UserData>(initialUserData);

  const authToken = localStorage.getItem("auth-token");

  const verifyUser = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${baseUrl}/api/v2/verify-token`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (data.message === "Valid User") {
        if (unAuthorizedRoutes.some((route) => route === location.pathname)) {
          navigate("/home");
        } else {
          navigate(location.pathname);
        }
        setUserData({
          name: data.userData.name,
          email: data.userData.email,
          phone_number: data.userData.phone_number,
          balance: data.userData.balance,
        });
      }
    } catch (error) {
      if (autherizedRoutes.some((route) => route === location.pathname)) {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
      console.error("error verifing:", error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [authToken]);

  return (
    <>
      <MyContext.Provider value={{ userData, verifyUser, setUserData }}>
        <Toaster />
        <Suspense
          fallback={
            <div className="h-screen">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* landing page */}
            {/* signup or signIn */}
            <Route path="/authentication" element={<Authentication />} />
            {/* if user tries to access these below pages without authentication then redirect him/her to the landing page */}
            {/* home page when user is signed in */}
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/search-user" element={<SearchUsers />} />
            <Route path="/transaction/:name/:email" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </MyContext.Provider>
    </>
  );
}

export default App;
