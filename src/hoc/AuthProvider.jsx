import { createContext, useState } from "react"

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loginActive, setLoginActive] = useState(false);
    const [onSuccessAction, setOnSuccessAction] = useState(null);

    const signin = (user) => {
        setUser(user);
    }
    const signout = () => {
        setUser(null);
    }
    const updateUserData = (newUser) => {
        setUser(prevUser=>({...prevUser, ...newUser}));
    }
    const value = {
        user, 
        signin, 
        signout, 
        updateUserData,
        loginActive, 
        setLoginActive, 
        onSuccessAction, 
        setOnSuccessAction
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}