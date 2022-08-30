import React, { createContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const connectUser = (user) => {
        setUser(user);
    }

    const disconnectUser = () => {
        setUser(null);
    }

    return(
        <UserContext.Provider value={{ user, connectUser, disconnectUser }}>
            {children}
        </UserContext.Provider>
    )
}