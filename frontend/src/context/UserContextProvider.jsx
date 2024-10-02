import React, { useState, createContext, useContext } from 'react';

// Create the context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);  
    const test="working";

    return (
        <UserContext.Provider value={{ user, setUser }}>  
            {children}
        </UserContext.Provider>
    );
};
export const userState=()=>{
    return useContext(UserContext);
}
export default UserContextProvider;