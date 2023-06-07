/* eslint-disable react/prop-types */

import {createContext, useEffect, useState} from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

const AuthWrapper = (props) =>{

    // 1. Functions and states
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [activeUser, setActiveUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState();

    
    //Function that verify the Token and receive the Payload
    
    const authenticateUser = async () =>{
        try {
            const response = await verifyService();
            console.log("Token validated");
            setIsLoggedIn(true);
            setActiveUser(response.data);
            response.data.rol.includes("admin") ? setIsAdmin (true) : setIsAdmin(false);
            setIsLoading(false)
        } catch (error) {
            console.log (error);
            console.log("Invalid token");
            setIsLoggedIn(false);
            setActiveUser();
            setIsLoading(false)
        }
    }

    //Initiate the authentication when the app starts for the first time

    useEffect(() =>{
        authenticateUser()
    }, []);

    // 2. Context object

    const passedContext = {isLoggedIn, activeUser, authenticateUser, isAdmin};

    // When the server is getting the data
    if(isLoading) {
        return(
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }

    // When everything is ok

    return(
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthWrapper};