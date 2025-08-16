"use client"


import { createContext, ReactNode} from "react"
import { RoleType, User } from "../../../generated/prisma";

export type UserWithoutPassword={
    
    name: string;
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    role: RoleType;
 
}

export const UserContext = createContext<{
    user?:UserWithoutPassword
   
}>({});

export default function UserProvider({ children,user }:{
    children:ReactNode,
    user:UserWithoutPassword
}) {


    return (
        <UserContext.Provider value={{user}} >
            

                {children}
            
        </UserContext.Provider>
    )
}