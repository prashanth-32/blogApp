import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo,setInfo] = useState({});
    return (
    <UserContext.Provider value={{userInfo,setInfo}}>
        {children}
    </UserContext.Provider>
    )
}