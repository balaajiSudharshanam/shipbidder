import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Create the context
const FormContext = createContext();

const FormContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);  
    const nav= useNavigate();
    // console.log(user);
    useEffect(()=>{
        if(!user){
            nav('/login')
        }
    },[user])
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