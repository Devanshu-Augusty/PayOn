interface I_Button {
  buttonText: string;
  onClick?: () => void;
  type?: "submit" | "button";
}

interface I_menu {
  name: string;
  path: string;
}

interface I_Navbar {
  menu: I_menu[];
  isUserAuthorized?: boolean;
}

interface I_InputwithLabel {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string | number;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  delay?: number
}

interface I_TextInputLabel {
  label: string;
  placeholder?: string;
  name: string;
  value: string;
  onchange: (event: any) => void;
  delay?: number
}

interface I_SignUpData {
  name: string;
  password: string;
  email: string;
  phone_number: number | "";
}

const initialSignUpData: I_SignUpData = {
  name: "",
  password: "",
  email: "",
  phone_number: "",
};

interface I_SignInData {
  email: string;
  password: string;
}

const initialSignInData: I_SignInData = {
  email: "",
  password: "",
};

interface I_Card {
  title: string;
  text: string;
  imgSrc: string;
  onClick: () => void;
}

interface I_UserCard {
  name: string;
  phoneNumber: number
  email: string;
  delay: number;
}

interface I_UserData {
  name: string;
  email: string;
  phone_number: number;
  balance: number;
}

const initialUserData: I_UserData = {
  name: "",
  email: "",
  phone_number: 0,
  balance: 0,
}

interface I_MyContext {
  userData: I_UserData;
  setUserData: React.Dispatch<React.SetStateAction<I_UserData>>
  verifyUser: () => Promise<void>;
}

interface I_TransactionData {
  receiver_name: string;
  sender_name: string;
  sender_email: string;
  receiver_email: string;
  transaction_amount: number;
  note: string;
  date: string;
}

export type {
  I_Button,
  I_Navbar,
  I_menu,
  I_InputwithLabel,
  I_SignUpData,
  I_SignInData,
  I_Card,
  I_UserCard,
  I_UserData,
  I_MyContext,
  I_TransactionData,
  I_TextInputLabel
};

export { initialSignUpData, initialSignInData, initialUserData };
