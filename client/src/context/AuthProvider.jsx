import { createContext,useState } from "react";

const AuthContext=createContext({}) //create an auth context

export const AuthProvider=({children})=>{   
    const [auth, setAuth]=useState({})

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext