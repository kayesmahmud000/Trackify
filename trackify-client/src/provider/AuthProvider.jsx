/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import authContext from "../context/authContext";
import { app } from "../firebase/firebase.init";
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(false)
    const auth = getAuth(app)

    const createUser=(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const userLogin=(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email ,password)
    }

    const logout= ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth , currentUser=>{
            if(currentUser && currentUser?.email){
                setUser(currentUser)

            }
            setLoading(false)
        })

        return ()=>{
            return unsubscribe()
         }
    },[auth])
    const authInfo= {
        user, 
        loading,
        createUser,
        userLogin,
        logout
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;