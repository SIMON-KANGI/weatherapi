import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth=()=>{  //custom hook for AuthProvider
    return useContext(AuthContext)
}
export default useAuth;