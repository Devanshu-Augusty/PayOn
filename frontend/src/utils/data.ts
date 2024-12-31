import { I_menu } from "../types/types";
import { FaGithub, FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

const unAuthorizedMenu: I_menu[] = [
  {
    path: "/",
    name: "Features",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const authorizedMenu: I_menu[] = [
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/contact",
    name: "Contact",
  },
]

const unAuthorizedRoutes = [
  "/",
  "/authentication",
]

const autherizedRoutes = [
  "/home",
  "/profile",
  "/history",
  "/search-user",
  "/make-payment",
  "/profile",
]

const socialMediaLinks = [
  {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/devanshu-augusty-25204a1b8/",
      icon: FaLinkedin,
  },
  {
      title: "Github",
      url: "https://github.com/Devanshu-Augusty",
      icon: FaGithub,
  },
  {
      title: "X",
      url: "https://x.com/DAugus7",
      icon: FaTwitter,
  },
];

export { unAuthorizedMenu, authorizedMenu, unAuthorizedRoutes, autherizedRoutes, socialMediaLinks };
