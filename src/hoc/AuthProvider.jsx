import { createContext, useState } from "react"

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, updateUser] = useState(null);
    const signin = (user) => {
        updateUser(user);
    }
    const signout = () => {
        updateUser(null);
    }
    const value = {user, signin, signout};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}