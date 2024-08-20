import { useContext } from "react";
import { AccountContext } from "../context/account.context";


const useAccount = () => {
  const { session } = useContext(AccountContext);
  return session;
};

export default useAccount;