import { createContext } from "react";
import { I_MyContext } from "../types/types";

export const MyContext = createContext<I_MyContext | undefined>(undefined);
